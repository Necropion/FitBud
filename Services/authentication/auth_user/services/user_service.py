from rest_framework.exceptions import ValidationError
from ..models.user_model import User
from ..serializers import UserSerializer
from . import social_service

# Get User By Email
def get_user_by_email(email):

    try:
        user = User.objects.get(email=email)
        return UserSerializer(user).data
    except User.DoesNotExist:
        raise ValidationError("User not found")

def authenticate_user_credentials(credentials):

    try:
        user = User.objects.get(email=credentials.get("email"))

        if user.password == credentials.get("password"):
            return {
                'authentication': 'true',
                "data": UserSerializer(user).data
            }
        else:
            return {'authentication': 'false'}

    except User.DoesNotExist:
        return {'authentication': 'false'}


def create_user(user_data, provider_data):

    email = user_data.get("email")
    provider = provider_data.get("provider")

    if provider == "none":
        if not user_data.get("name") or not user_data.get("password"):
            raise ValidationError("Name and password are required for traditional signup.")

        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                "name": user_data.get("name"),
                "password": user_data.get("password")
            }
        )

        return UserSerializer(user).data

    # Provider flow
    user_defaults = {
        "name": user_data.get("name"),
    }

    user_object, is_created = User.objects.get_or_create(
        email=email,
        defaults=user_defaults
    )

    # Correct: Get the ID from user_object, not from input
    social_service.create_social_link(user_object, provider, user_object.id, email)

    return UserSerializer(user_object).data
