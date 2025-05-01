from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from ..models.user_model import User
from ..serializers import UserSerializer
from  ..serializers.dtos import AuthenticationSerializer
from ..services import user_service


class UserViewSet(ModelViewSet):
    # GET All Users
    # Get Single User by ID
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # Override Post Single User
    def create(self, request, *args, **kwargs):

        provider = request.data.get('provider')
        user = request.data.get('user')

        # Error if body is missing data
        if not user:
            return Response({'message': 'Missing user data'}, status=status.HTTP_400_BAD_REQUEST)

        if not provider:
            return Response({'message': 'Missing provider data'}, status=status.HTTP_400_BAD_REQUEST)

        # Validate User Object
        user_object = UserSerializer(data=user)
        if user_object.is_valid(raise_exception=True):
            user_created = user_service.create_user(user_object.validated_data, provider)
            return Response(user_created)

        return Response({"message": "Internal Server Error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Validate User
    @action(detail=False, methods=['post'], url_path="authenticate")
    def authenticate(self, request):

        authentication_object = AuthenticationSerializer(data=request.data)
        if authentication_object.is_valid(raise_exception=True):
            credentials = authentication_object.validated_data

            auth_result = user_service.authenticate_user_credentials(credentials)
            if auth_result.get("authentication") == "true":
                return Response(auth_result, status=status.HTTP_200_OK)

            if auth_result.get("authentication") == "false":
                return Response(auth_result, status=status.HTTP_401_UNAUTHORIZED)

            else:
                return Response(auth_result, status=status.HTTP_400_BAD_REQUEST)


        return Response(authentication_object.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


