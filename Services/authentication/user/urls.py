from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_users, name='GET Users'),
    path('<int:user_id>', views.get_user, name='GET Single User'),
    path('create/', views.post_user, name='POST User'),
    path('authenticate/', views.authenticate_user, name='POST Authentication'),
]