from django.urls import path, include
from rest_framework.routers import DefaultRouter
from ..views import workout_plan_views

router = DefaultRouter()
router.register(r'', workout_plan_views.WorkoutPlanViewSet, basename='workout-plan')

urlpatterns = [
    path('', include(router.urls)),
]
