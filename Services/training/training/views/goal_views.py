from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from training.serializers import GoalSerializer
from training.services import goal_service

class GoalViewSet(ViewSet):

    # Get All Goals
    def list(self, request):
        goals = goal_service.fetch_goals()
        return Response({
            "message": "Goals retrieved successfully",
            "data": goals
        }, status.HTTP_200_OK)

    # Post Goal
    def create(self, request):
        serializer = GoalSerializer(data=request.data)
        if serializer.is_valid():
            goal = goal_service.create_goal(serializer.validated_data)
            return Response({
                "message": "Goal created successfully",
                "data": goal.to_dict()
            }, status.HTTP_201_CREATED)
        return Response({
            "message": "Failed to create goal",
            "error": serializer.errors
        }, status.HTTP_400_BAD_REQUEST)

    # Get All User Goals
    @action(detail=False, methods=['get'], url_path='user')
    def get_user_goals(self, request):
        user_id = request.query_params.get('user_id')
        user_goals = goal_service.fetch_user_goals(user_id)
        return Response({
            "message": "User goals retrieved successfully",
            "data": user_goals
        }, status.HTTP_200_OK)
