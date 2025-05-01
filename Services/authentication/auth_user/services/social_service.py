from ..models.social_model import Social
from ..serializers import SocialSerializer

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

def create_social_link(user, provider, provider_user_id, email):
    created_social, is_created = Social.objects.get_or_create(
        user=user,
        provider=provider,
        provider_user_id=provider_user_id,
        email=email
    )

    return {"message": "Social link created!", "data": SocialSerializer(created_social).data}