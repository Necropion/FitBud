from django.urls import path
from ..views import google_views

urlpatterns = [
    path('oauth_url/', google_views.get_oauth_url, name='GET Oauth URL'),
    path('callback/', google_views.callback, name='CALLBACK'),
]
