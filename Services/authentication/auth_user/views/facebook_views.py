from rest_framework.viewsets import ViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError
from django.conf import settings
from django.http import JsonResponse
from urllib.parse import urlencode
import secrets
import requests
from ..services import user_service, social_service

class FacebookViewSet(ViewSet):

    # Get Facebook Auth URL
    @action(detail=False, methods=['get'], url_path='oauth_url')
    def get_facebook_oauth_url(self, request):
        auth_url = "https://www.facebook.com/v22.0/dialog/oauth?"
        state = secrets.token_urlsafe(16)

        # Get auth url params
        url_params = {
            "client_id": settings.FACEBOOK_APP_ID,
            "redirect_uri": settings.FACEBOOK_REDIRECT_URI,
            "state": f"facebook_{state}",
            "response_type": "code",
            "scope": "email, public_profile",
        }

        # Save state in session
        request.session['oauth_state'] = url_params['state']

        # Convert to query string
        authorization_url = f"{auth_url}{urlencode(url_params)}"

        return JsonResponse({
            "message": "Facebook OAuth Url was fetched",
            "data": {
                "url": authorization_url,
                "state": f"facebook_{state}"
            }
        })

    # Exchange Code for Access Token and Return User Facebook Details
    @action(detail=False, methods=['post'], url_path='callback')
    def facebook_callback(self, request):
        provider = "facebook"
        code = request.data.get('code')
        state = request.data.get('state')

        if not code:
            return Response({"error": "Missing authorization code."}, status=400)

        if not state:
            return Response({"error": "Missing or expired session state."}, status=400)

        try:
            # Exchange Code for Access Token
            token_url ="https://graph.facebook.com/v22.0/oauth/access_token"
            token_params = {
                "client_id": settings.FACEBOOK_APP_ID,
                "redirect_uri": settings.FACEBOOK_REDIRECT_URI,
                "client_secret": settings.FACEBOOK_APP_SECRET,
                "code": code,
            }
            token_response = requests.get(token_url, params=token_params)
            token_data = token_response.json()

            access_token = token_data.get('access_token')
            if not access_token:
                return Response({"error": "Missing or expired access token."}, status=400)

            # Fetch User Profile From Facebook
            user_info_url = "https://graph.facebook.com/me"
            user_info_params = {
                "fields": "id, name, email",
                "access_token": access_token,
            }
            user_info_response = requests.get(user_info_url, params=user_info_params)
            fb_data = user_info_response.json()

            fb_id = fb_data.get('id')
            fb_email = fb_data.get('email')

            if not fb_id or not fb_email:
                return Response({"error": "Missing or expired facebook user info."}, status=400)

            try:
                existing_user = social_service.get_social_by_email_and_provider(fb_email, provider)
                return  Response({
                    "message": "Facebook User Details Retrieved Successfully!",
                    "data": existing_user
                })
            except ValidationError:
                new_facebook_user = user_service.create_user(fb_data, provider)
                return Response({
                    "message": "Facebook User Created Successfully!",
                    "data": new_facebook_user
                })

        except Exception as e:
            return Response({"error": str(e)}, status=500)
