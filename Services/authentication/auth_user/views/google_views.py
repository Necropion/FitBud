import secrets

from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from rest_framework.decorators import action
from django.conf import settings
import google_auth_oauthlib.flow
from django.http import JsonResponse
import requests
import json

class GoogleViewSet(ViewSet):

    # Get Google Auth URL
    @action(detail=False, methods=['get'], url_path='oauth_url')
    def get_google_oauth_url(self, request):
        client_config = {
            "web": {
                "client_id": settings.GOOGLE_CLIENT_ID,
                "client_secret": settings.GOOGLE_CLIENT_SECRET,
                "redirect_uris": ["http://localhost:5173/callback"],
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
            }
        }

        flow = google_auth_oauthlib.flow.Flow.from_client_config(
            client_config=client_config,
            scopes=[
                "openid",
                "https://www.googleapis.com/auth/userinfo.email",
                "https://www.googleapis.com/auth/userinfo.profile"
            ]
        )
        flow.redirect_uri = "http://localhost:5173/callback"

        state = secrets.token_urlsafe(16)

        authorization_url, _ = flow.authorization_url(
            access_type='offline',
            include_granted_scopes='true',
            prompt='consent',
            state=f"google_{state}"
        )

        request.session['oauth_state'] = state

        return JsonResponse({"message": "Google Authentication URL fetched successfully",
                             "data": {
                                 "url": authorization_url,
                                 "state": f"google_{state}"
                             }
        })


    # Get Google User Details
    @action(detail=False, methods=['post'], url_path='callback')
    def google_callback(self, request):
        data = json.loads(request.body)
        code = data.get("code")
        state = data.get("state")  # ✅ match with `code` source

        if not code:
            return Response({"error": "Missing authorization code."}, status=400)

        if not state:
            return Response({"error": "Missing or expired session state."}, status=400)

        client_config = {
            "web": {
                "client_id": settings.GOOGLE_CLIENT_ID,
                "client_secret": settings.GOOGLE_CLIENT_SECRET,
                "redirect_uris": ["http://localhost:5173/callback"],
                "auth_uri": "https://accounts.google.com/o/oauth2/auth",
                "token_uri": "https://oauth2.googleapis.com/token",
            }
        }

        try:
            flow = google_auth_oauthlib.flow.Flow.from_client_config(
                client_config=client_config,
                scopes=[
                    "openid",
                    "https://www.googleapis.com/auth/userinfo.email",
                    "https://www.googleapis.com/auth/userinfo.profile"
                ],
                state=state
            )
            flow.redirect_uri = "http://localhost:5173/callback"

            flow.fetch_token(code=code)  # 💥 this is likely where it crashes

            credentials = flow.credentials
            access_token = credentials.token

            user_info = requests.get(
                'https://www.googleapis.com/oauth2/v1/userinfo',
                headers={'Authorization': f'Bearer {access_token}'}
            ).json()

            return Response({
                "message": "Google User Details Retrieved successfully",
                "data": user_info
            })

        except Exception as e:
            print(f"OAuth error: {str(e)}")  # helpful in Django console
            return Response({"error": str(e)}, status=500)
