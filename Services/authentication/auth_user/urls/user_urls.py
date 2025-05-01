from django.urls import path
from ..views import user_views

urlpatterns = [
    path('', user_views.get_users, name='GET Users'),
    path('<str:user_email>', user_views.get_user_by_email, name='GET Single User by Email'),
    path('create/', user_views.post_user, name='POST User'),
    path('authenticate/', user_views.authenticate_user, name='POST Authentication'),
]