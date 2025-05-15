from django.core.serializers import serialize
from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from dataclasses import asdict
from training.models import Exercise
from training.serializers import WorkoutSerializer, ExerciseSerializer
from training.serializers.dtos.workout_details_serializer import WorkoutDetailsSerializer
from training.services import workout_service
from training.models.dtos.workout_details_dto import WorkoutDetailsDTO

class WorkoutViewSet(ViewSet):

    # Get All Workouts
    def list(self, request):
        workouts = workout_service.fetch_workouts()
        return Response({
            "message": "Workouts fetched successfully",
            "data": workouts
        }, status=status.HTTP_200_OK)

    # Get User Workouts
    @action(detail=False, methods=['get'], url_path='user-workouts')
    def get_user_workouts(self, request):
        print("Query params:", request.query_params)
        print("Path:", request.path)
        user_id = request.query_params.get('user_id')
        user_workouts = workout_service.fetch_user_workouts(user_id)
        return Response({
            "message": "Workouts fetched successfully",
            "data": user_workouts
        }, status=status.HTTP_200_OK)

    # Post Workout
    def create(self, request):
        workout = workout_service.create_workout(request.data)
        serializer = WorkoutSerializer(workout)
        return Response({
            "message": "Workout created successfully",
            "data": serializer.data
        }, status=status.HTTP_201_CREATED)

    # Post Workout Through Exercise
    @action(detail=False, methods=['post'], url_path='post-with-exercise')
    def post_with_exercise(self, request):
        exercise = request.data['exercise']
        exercise_id = exercise['id']
        user_id = request.data['user_id']

        serialized_exercise = ExerciseSerializer(data=exercise)

        if serialized_exercise.is_valid():
            workout_dto = workout_service.create_with_exercise(serialized_exercise.validated_data, user_id, exercise_id)
            serialized_workout = WorkoutDetailsSerializer(workout_dto)
            return Response({
                "message": "Workout created successfully",
                "data": serialized_workout.data
            })
        else:
            return Response({
                "message": "Error creating workout",
                "error": serialized_exercise.errors
            })

    # Update Workout
    @action(detail=False, methods=['put'], url_path='update')
    def put_workout(self, request):
        workout = request.data.get('workout')

        if not workout or workout.get('id') is None:
            return Response({
                "message": "No workout id provided",
                "error": "No workout id provided"
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            updated_workout = workout_service.update_workout(workout)

            return Response({
                "message": "Workout updated successfully",
                "data": updated_workout.to_dict()
            }, status=status.HTTP_200_OK)

        except ValueError as ve:
            return Response({
                "message": "Error updating workout",
                "error": str(ve)
            }, status=status.HTTP_400_BAD_REQUEST)
        except Exception as ex:
            return Response({
                "message": "Error updating workout",
                "error": str(ex)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Delete Workout
    def destroy(self, request, pk=None):
        try:
            deleted_workout = workout_service.delete_workout(pk)
            return Response({
                "message": "Workout deleted successfully",
                "data": deleted_workout.to_dict()
            }, status=status.HTTP_200_OK)
        except Exception as ex:
            return Response({
                "message": "Failed to delete workout",
                "error": str(ex)
            }, status=status.HTTP_400_BAD_REQUEST)