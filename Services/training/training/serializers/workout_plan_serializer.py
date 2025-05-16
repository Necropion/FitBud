from rest_framework import serializers

class WorkoutPlanSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    user_id = serializers.UUIDField()
    name = serializers.CharField()
    description = serializers.CharField()
    goal_id = serializers.IntegerField()
    created_at = serializers.DateTimeField()
    notes = serializers.CharField(required=False, allow_blank=True, allow_null=True)