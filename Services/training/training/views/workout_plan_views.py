from django.contrib.admin import action
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status

from training.models import WorkoutPlan
from training.serializers import WorkoutPlanSerializer
from training.services import workout_plan_service

class WorkoutPlanViewSet(ViewSet):

    # Get All Workout Plans
    def list(self, request):
        workout_plans = workout_plan_service.get_workout_plans()
        return Response({
            "message": "Workout Plans fetched successfully",
            "data": workout_plans
        }, status=status.HTTP_200_OK)

    # Get All User Workout Plans
    @action(detail=False, methods=['get'], url_path='user-plans')
    def get_user_workout_plans(self, request):
        user_id = request.query_params.get('user_id')
        user_plans = workout_plan_service.fetch_user_workout_plans(user_id)
        return Response({
            "message": "Workout Plans fetched successfully",
            "data": user_plans
        }, status=status.HTTP_200_OK)

    # Post Workout Plan
    def create(self, request):
        workout_plan = workout_plan_service.create_workout_plan(request.data)
        serializer = WorkoutPlanSerializer(workout_plan)
        return Response({
            "message": "Workout Plan created successfully",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)