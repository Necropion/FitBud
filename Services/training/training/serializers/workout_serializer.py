from rest_framework import serializers

class WorkoutSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    user_id = serializers.UUIDField()
    name = serializers.CharField()
    description = serializers.CharField()
    created_at = serializers.DateTimeField(read_only=True)
    ended_at = serializers.DateTimeField(read_only=True)
    notes = serializers.CharField()