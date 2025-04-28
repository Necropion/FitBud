from rest_framework import status
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

    serializer = serializers.ExerciseSerializer(data=request.data)
    if serializer.is_valid():
        created_exercise = services.create_exercise(serializer.validated_data)
        response_serializer = serializers.ExerciseSerializer(created_exercise)
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def delete_exercise(request, exercise_id):

    services.remove_exercise(exercise_id)

    return Response({"message": "Exercise deleted successfully."}, status=status.HTTP_204_NO_CONTENT)