from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from training.models import Goal
from training.serializers import GoalSerializer
from training.services import goal_service

class GoalViewSet(ViewSet):

    # Get All Goals
    def list(self, request):
        goals = goal_service.get_goals()
        return Response({
            "message": "Goals retrieved successfully",
            "data": goals
        }, status.HTTP_200_OK)
