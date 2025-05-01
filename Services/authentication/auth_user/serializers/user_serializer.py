from rest_framework import serializers
from auth_user.models.user_model import User

class UserSerializer(serializers.ModelSerializer):
    name = serializers.CharField(required=False)

    class Meta:
        model = User
        fields = '__all__'

        extra_kwargs = {
            'password': {'write_only': True}
        }
