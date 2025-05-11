from django.urls import include, path
from . import exercise_urls

urlpatterns = [
    path('exercise/', include(exercise_urls)),
]
