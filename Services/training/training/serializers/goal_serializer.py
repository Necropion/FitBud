from rest_framework import serializers

class GoalSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    user_id = serializers.UUIDField()
    type = serializers.CharField()
    target = serializers.CharField()
    description = serializers.CharField()
    deadline = serializers.DateTimeField()
    created_at = serializers.DateTimeField(read_only=True)