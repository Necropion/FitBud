from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import User
from .serializers import UserSerializer

# Get All Users
@api_view(['GET'])
def get_users(request):

    users = User.objects.all()
    serialized = UserSerializer(users, many=True)

    return Response(serialized.data)

# Get Single User
@api_view(['GET'])
def get_user(request, user_id):
    user = User.objects.get(pk=user_id)
    serialized = UserSerializer(user)
    return Response(serialized.data)

@api_view(['POST'])
def authenticate_user(request):
    credentials = request.data
    try:
        user = User.objects.get(Email=credentials['Email'])

        if user.Password == credentials['Password']:
            return Response({'authentication': 'true'})
        else:
            return Response({'authentication': 'false'})

    except User.DoesNotExist:
        return Response({'authentication': 'false'})

# Post User
@api_view(['POST'])
def post_user(request):

    if User.objects.filter(Email=request.data['Email']).exists():
        return Response({'message': 'User already exists'}, status=400)

    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)

    return Response(serializer.errors, status=400)