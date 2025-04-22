from django.http import JsonResponse
from django.forms.models import model_to_dict
from .models import User

def get_user(request):

    user1 = User()

    user1.Name = 'Jokubas'
    user1.Email = '<EMAIL>'
    user1.Password = '<PASSWORD>'

    user = model_to_dict(user1)

    return JsonResponse(user)
