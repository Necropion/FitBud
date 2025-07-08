from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from training.serializers import MuscleGroupSerializer
from training.services import muscle_group_service

class MuscleGroupViewSet(ViewSet):

    # Get All Muscle Groups
    def list(self, request):
        muscle_groups = muscle_group_service.get_muscle_groups()
        return Response({
            "message": "Muscle Groups fetched successfully",
            "data": muscle_groups
        }, status=status.HTTP_200_OK)

    # Post Muscle Group
    def create(self, request):
       serializer = MuscleGroupSerializer(data=request.data)
       if serializer.is_valid():
           muscle_group = muscle_group_service.create_muscle_group(serializer.validated_data)
           return Response({
               "message": "Muscle Group created",
               "data": muscle_group.to_dict()
           }, status=status.HTTP_201_CREATED)
       return Response({
           "message": "Failed to create Muscle Group",
           "errors": serializer.errors
       }, status=status.HTTP_400_BAD_REQUEST)