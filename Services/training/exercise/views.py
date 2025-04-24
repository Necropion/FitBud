from rest_framework.decorators import api_view
from rest_framework.response import Response
from . import services
from . import serializers

# Get All Exercises
@api_view(['GET'])
def get_exercises(request):

    exercises = services.fetch_exercises()
    serialized = serializers.ExerciseSerializer(exercises, many=True)

    return Response(serialized.data)

# Get Single Exercise by Id
@api_view(['GET'])
def get_exercise_by_id(request, exercise_id):

    exercise = services.fetch_exercise_by_id(exercise_id)
    serialized = serializers.ExerciseSerializer(exercise)
    return Response(serialized.data)

# Post a Single Exercise
@api_view(['POST'])
def post_exercise(request):

    created_exercise = services.create_exercise(request.data)

    serialized_exercise = serializers.ExerciseSerializer(data=created_exercise)
    if serialized_exercise.is_valid():
        serialized_exercise.save()
        return Response(serialized_exercise.data)

    return Response(serialized_exercise.errors, status=400)