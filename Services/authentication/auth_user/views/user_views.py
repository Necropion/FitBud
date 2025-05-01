from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from auth_user.models.user_model import User
from auth_user.serializers import user_serializer


class UserViewSet(ModelViewSet):
    # GET All Users
    # Get Single User by ID
    # Post User
    queryset = User.objects.all()
    serializer_class = user_serializer.UserSerializer

    # Validate User
    @action(detail=False, methods=['post'], url_path="authenticate")
    def authenticate(self, request):
        credentials = request.data
        try:
            user = User.objects.get(email=credentials['email'])

            if user.password == credentials['password']:
                return Response(user_serializer.UserSerializer(user).data)
            else:
                return Response({'authentication': 'false'})

        except User.DoesNotExist:
            return Response({'authentication': 'false'})

