from django.urls import include, path
from . import exercise_urls, workout_urls, workout_exercise_urls, workout_plan_urls, goal_urls

urlpatterns = [
    path('exercise/', include(exercise_urls)),
    path('workout/', include(workout_urls)),
    path('workout-exercise/', include(workout_exercise_urls)),
    path('workout-plan/', include(workout_plan_urls)),
    path('goal/', include(goal_urls)),
]
