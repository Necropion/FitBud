from rest_framework import serializers
from training.serializers import WorkoutExerciseSerializer

class WorkoutDetailsSerializer(serializers.Serializer):
    id = serializers.IntegerField()
    name = serializers.CharField()
    exercises = WorkoutExerciseSerializer(many=True)
