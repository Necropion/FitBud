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


def create_user(user_data, provider):

    email = user_data.get("email")

    # If no provider given
    if provider == "none":
        if not user_data.get("name") or not user_data.get("password"):
            return ValidationError("Name and password are required for traditional signup.")

        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                "name": user_data.get("name"),
                "password": user_data.get("password")
            }
        )

        return UserSerializer(user).data


    user_defaults = {
        "name": user_data.get("name") or user_data["name"],
    }

    # Link existing user by email, or create a new user
    user_object, is_created = User.objects.get_or_create(
        email=email,
        defaults=user_defaults
    )

    # Create Social Link
    social_service.create_social_link(user_object, provider, user_data['id'], email)

    return UserSerializer(user_object).data