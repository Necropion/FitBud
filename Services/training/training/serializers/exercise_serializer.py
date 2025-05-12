from rest_framework import serializers

class ExerciseSerializer(serializers.Serializer):
    id = serializers.IntegerField(read_only=True)
    name = serializers.CharField()
    duration = serializers.IntegerField()
    intensity = serializers.CharField(allow_blank=True, required=False)
    description = serializers.CharField(allow_blank=True, required=False)
    category = serializers.CharField()
    equipment_required = serializers.CharField()
    created_at = serializers.DateTimeField(read_only=True)
