from ..models.user_model import User
from ..serializers import user_serializer, UserSerializer

def authenticate_user_credentials(credentials):

    try:
        user = User.objects.get(email=credentials.get("email"))

        if user.password == credentials.get("password"):
            return {
                'authentication': 'true',
                "data": user_serializer.UserSerializer(user).data
            }
        else:
            return {'authentication': 'false'}

    except User.DoesNotExist:
        return {'authentication': 'false'}

def create_user(user, provider):

    if provider == "none":
        user = User.objects.create(**user)
        return {"message": "User created successfully", "data": UserSerializer(user).data}


    return user_serializer.UserSerializer(user).data
