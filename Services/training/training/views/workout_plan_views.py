from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from training.data.db import SessionLocal
from training.models import WorkoutPlan
from training.serializers import WorkoutPlanSerializer, WorkoutExerciseSerializer
from training.services import workout_plan_service, workout_exercise_service
import logging

logger = logging.getLogger(__name__)


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
        db = SessionLocal()
        try:
            workout_plan_data = {
                "user_id": request.data.get('user_id'),
                "name": request.data.get('name'),
                "description": request.data.get('description'),
                "goal_id": request.data.get('goal_id'),
                "notes": request.data.get('notes'),
            }
            workout_plan = workout_plan_service.create_workout_plan(db=db, data=workout_plan_data)
            workout_plan_serializer = WorkoutPlanSerializer(workout_plan)

            workout_exercises_data = request.data.get('exercises')
            workout_exercises = workout_exercise_service.create_workout_exercises_list(db=db, workout_plan_id=workout_plan.id, exercise_list=workout_exercises_data)
            workout_exercises_serializer = WorkoutExerciseSerializer(workout_exercises, many=True)

            db.commit()

            db.refresh(workout_plan)
            for obj in workout_exercises:
                db.refresh(obj)

            return Response({
                "message": "Workout Plan created successfully",
                "data": {
                    "workout_plan": workout_plan_serializer.data,
                    "exercises": workout_exercises_serializer.data,
                }
            }, status=status.HTTP_201_CREATED)
        except Exception as ex:
            db.rollback()
            logger.error(f"Error creating workout plan: {ex}")
            raise Exception("Error creating workout plan")
        finally:
            db.close()