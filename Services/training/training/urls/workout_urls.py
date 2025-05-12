from django.urls import path, include
from rest_framework.routers import DefaultRouter
from ..views import workout_views

router = DefaultRouter()
router.register(r'', workout_views.WorkoutViewSet, basename='workout')

urlpatterns = [
    path('', include(router.urls)),
]
