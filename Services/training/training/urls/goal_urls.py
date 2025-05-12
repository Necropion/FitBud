from django.urls import path, include
from rest_framework.routers import DefaultRouter
from ..views import goal_views

router = DefaultRouter()
router.register(r'', goal_views.GoalViewSet, basename='goal')

urlpatterns = [
    path('', include(router.urls)),
]
