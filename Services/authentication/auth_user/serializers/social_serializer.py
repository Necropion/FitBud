from rest_framework import serializers
from auth_user.models.social_model import Social

class SocialSerializer(serializers.ModelSerializer):
    class Meta:
        model = Social
        fields = '__all__'
