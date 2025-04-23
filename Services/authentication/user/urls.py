from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_users, name='GET Users'),
    path('<str:user_email>', views.get_user_by_email, name='GET Single User by Email'),
    path('create/', views.post_user, name='POST User'),
    path('authenticate/', views.authenticate_user, name='POST Authentication'),
]