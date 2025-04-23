from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Exercise
from .serializers import ExerciseSerializer

# Get All Exercises
@api_view(['GET'])
def get_exercises(request):

    exercises = Exercise.objects.all()
    serialized = ExerciseSerializer(exercises, many=True)

    return Response(serialized.data)

# Get Single Exercise by Id
@api_view(['GET'])
def get_exercise_by_id(request, exercise_id):
    exercise = Exercise.objects.get(Id=exercise_id)
    serialized = ExerciseSerializer(exercise)
    return Response(serialized.data)

# Post a Single Exercise
@api_view(['POST'])
def post_exercise(request):
    serializer = ExerciseSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=400)