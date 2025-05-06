from django.urls import path, include
from rest_framework.routers import DefaultRouter
from ..views import facebook_views

router = DefaultRouter()
router.register(r'', facebook_views.FacebookViewSet, basename='facebook')

urlpatterns = [
    path('', include(router.urls)),
]
