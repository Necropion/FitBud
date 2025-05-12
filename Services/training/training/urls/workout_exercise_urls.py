from django.urls import path, include
from rest_framework.routers import DefaultRouter
from ..views import workout_exercise_views

router = DefaultRouter()
router.register(r'', workout_exercise_views.WorkoutExerciseViewSet, basename='workout-exercise')

urlpatterns = [
    path('', include(router.urls)),
]
