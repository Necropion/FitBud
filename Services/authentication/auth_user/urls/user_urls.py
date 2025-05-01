from django.urls import path, include
from rest_framework.routers import DefaultRouter
from ..views import user_views

router = DefaultRouter()
router.register(r'', user_views.UserViewSet, basename='user')

urlpatterns = [
    # User
    path('', include(router.urls)),
]