from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['Id', 'Name', 'Email', 'Password']

        extra_kwargs = {
            'Password': {'write_only': True}
        }