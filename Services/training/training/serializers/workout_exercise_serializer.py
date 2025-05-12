from rest_framework import serializers

class WorkoutExerciseSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    workout_id = serializers.IntegerField()
    exercise_id = serializers.IntegerField()
    order = serializers.IntegerField()
    sets = serializers.IntegerField()
    reps = serializers.IntegerField()
    duration = serializers.IntegerField()