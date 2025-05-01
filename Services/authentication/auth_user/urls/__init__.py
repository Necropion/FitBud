from django.urls import include, path
from . import user_urls, google_urls

urlpatterns = [
    path('user/', include(user_urls)),
    path('google/', include(google_urls)),
]
