from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_exercises, name='GET All Exercises'),
    path('int:<int:exercise_id>', views.get_exercise_by_id, name='GET Single Exercise'),
    path('create/', views.post_exercise, name='POST a Single Exercise'),
]