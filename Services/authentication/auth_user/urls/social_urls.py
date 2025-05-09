from django.urls import path, include
from rest_framework.routers import DefaultRouter
from ..views import social_views

router = DefaultRouter()
router.register(r'', social_views.SocialViewSet, basename='social')

urlpatterns = [
    path('', include(router.urls)),
]
