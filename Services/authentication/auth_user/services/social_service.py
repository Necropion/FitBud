from rest_framework.exceptions import ValidationError
from . import user_service
from ..models.social_model import Social
from ..serializers import SocialSerializer, UserSerializer


# Get Social By Provider Details
def get_social_by_provider(provider, provider_user_id):

    try:
        user_social = Social.objects.get(
            provider=provider,
            provider_user_id=provider_user_id
        )
        return {
            "message": "User social found",
            "data": SocialSerializer(user_social).data
        }

    except Social.DoesNotExist:
        return {
            "message": "User social not found",
            "data": None
        }

# Get Social By Email
def get_social_by_email_and_provider(email, provider):

    try:
        Social.objects.get(email=email, provider=provider)
        user = user_service.get_user_by_email(email)
        return UserSerializer(user).data
    except Social.DoesNotExist:
        raise ValidationError("User social not found")


def create_social_link(user, provider, provider_user_id, email):
    created_social, is_created = Social.objects.get_or_create(
        user=user,
        provider=provider,
        provider_user_id=provider_user_id,
        email=email
    )

    return {"message": "Social link created!", "data": SocialSerializer(created_social).data}