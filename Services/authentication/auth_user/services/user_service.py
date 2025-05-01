from ..models.user_model import User
from ..serializers import UserSerializer
from . import social_service

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
    provider_user_id = provider_data.get("provider_user_id")
    provider_user_name = provider_data.get("provider_user_name")

    # If no provider given
    if provider == "none":
        if not user_data.get("name") or not user_data.get("password"):
            return {
                "message": "Name and password are required for traditional signup."
            }

        user, created = User.objects.get_or_create(
            email=email,
            defaults={
                "name": user_data.get("name"),
                "password": user_data.get("password")
            }
        )

        return {
            "message": "User created!" if created else "User already exists!",
            "data": UserSerializer(user).data
        }

    # Check if this provider link already exists
    social = social_service.get_social_by_provider(provider, provider_user_id)

    if social["data"]:
        return {
            "message": f"User already logged in with {provider}",
            "data": social["data"]
        }

    user_defaults = {
        "name": user_data.get("name") or provider_user_name
    }


    # Link existing user by email, or create a new user
    user_object, is_created = User.objects.get_or_create(
        email=email,
        defaults=user_defaults
    )

    # Create Social Link
    social_service.create_social_link(user_object, provider, provider_user_id, email)

    return {
        "message": f"{'User created!' if is_created else 'User linked!'}",
        "data": UserSerializer(user_object).data
    }