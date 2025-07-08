from django.urls import path, include
from rest_framework.routers import DefaultRouter
from ..views import muscle_group_views

router = DefaultRouter()
router.register(r'', muscle_group_views.MuscleGroupViewSet, basename='goal')

urlpatterns = [
    path('', include(router.urls)),
]
