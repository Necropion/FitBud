from rest_framework import status
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from ..models.user_model import User
from ..serializers import UserSerializer
from ..serializers.dtos import AuthenticationSerializer
from ..services import user_service


class UserViewSet(ModelViewSet):
    # GET All Users
    # Get Single User by ID
    queryset = User.objects.all()
    serializer_class = UserSerializer

    # Override Post Single User
    def create(self, request, *args, **kwargs):

        print("Incoming request.data:", request.data)

        provider_data = request.data.get('provider_data')
        user_data = request.data.get('user_data')

        # Error if body is missing data
        if not user_data:
            return Response({'message': 'Missing user data'}, status=status.HTTP_400_BAD_REQUEST)

        if not provider_data:
            return Response({'message': 'Missing provider data'}, status=status.HTTP_400_BAD_REQUEST)

        user_object = UserSerializer(data=user_data)
        if not user_object.is_valid():
            print("Serializer validation error:", user_object.errors)
            return Response(user_object.errors, status=status.HTTP_400_BAD_REQUEST)

        # Validate User Object
        if user_object.is_valid(raise_exception=True):
            user_created = user_service.create_user(user_object.validated_data, provider_data)
            return Response({
                "data": user_created,
                "message": "User created successfully"
                },
                status=status.HTTP_201_CREATED)

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


