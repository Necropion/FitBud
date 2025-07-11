from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework.decorators import action
from rest_framework import status
from training.serializers import WorkoutExerciseSerializer, ExerciseSerializer
from training.services import workout_exercise_service

class WorkoutExerciseViewSet(ViewSet):

    # Get All Workout Exercises
    def list(self, request):
        workout_exercises = workout_exercise_service.get_workout_exercises()
        return Response({
            "message": "Workout Exercises fetched successfully",
            "data": workout_exercises
        }, status=status.HTTP_200_OK)


    @action(detail=False, methods=['post'], url_path='create-workout-exercises-list')
    def post_workout_exercise_list(self, request):
        exercise_id_list = request.data['exerciseIdList']
        workout_id = request.data['workoutId']

        try:
            created_workout_exercises = workout_exercise_service.create_workout_exercises_list(workout_id, exercise_id_list)
            serializer = WorkoutExerciseSerializer(created_workout_exercises, many=True)

            return Response({
                "message": "Workout Exercises created successfully",
                "data": serializer.data
            }, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({
                "message": "Something went wrong while creating workout exercises",
                "error": str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

