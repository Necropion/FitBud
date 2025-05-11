from django.urls import path, include
from rest_framework.routers import DefaultRouter
from ..views import exercise_views

router = DefaultRouter()
router.register(r'', exercise_views.ExerciseViewSet, basename='exercise')

urlpatterns = [
    path('', include(router.urls)),
]
