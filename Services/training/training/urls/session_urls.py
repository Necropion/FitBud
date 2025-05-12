from django.urls import path, include
from rest_framework.routers import DefaultRouter
from ..views import session_views

router = DefaultRouter()
router.register(r'', session_views.SessionViewSet, basename='session')

urlpatterns = [
    path('', include(router.urls)),
]
