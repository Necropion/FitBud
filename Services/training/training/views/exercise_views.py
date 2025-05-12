from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from training.serializers import ExerciseSerializer
from training.services import exercise_service

class ExerciseViewSet(ViewSet):

    # Get All Exercises
    def list(self, request):
        exercises = exercise_service.get_exercises()
        return Response({
            "message": "Exercises fetched successfully",
            "data": exercises
        }, status=status.HTTP_200_OK)

    # Post Exercise
    def create(self, request):
       serializer = ExerciseSerializer(data=request.data)
       if serializer.is_valid():
           exercise = exercise_service.create_exercise(serializer.validated_data)
           return Response({
               "message": "Exercise created",
               "data": exercise.to_dict()
           }, status=status.HTTP_201_CREATED)
       return Response({
           "message": "Failed to create exercise",
           "errors": serializer.errors
       }, status=status.HTTP_400_BAD_REQUEST)

    # Delete Exercise
    def destroy(self, request, pk=None):
        try:
            deleted_exercise = exercise_service.delete_exercise(pk)
            return Response({
                "message": "Exercise deleted",
                "data": deleted_exercise.to_dict()
            }, status=status.HTTP_200_OK)
        except Exception as ex:
            return Response({
                "message": "Failed to delete exercise",
                "errors": str(ex)
            }, status=status.HTTP_400_BAD_REQUEST)