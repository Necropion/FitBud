from rest_framework.viewsets import ModelViewSet
from ..models import Social
from ..serializers import SocialSerializer


class SocialViewSet(ModelViewSet):
    # GET All Users
    # Get Single User by ID
    queryset = Social.objects.all()
    serializer_class = SocialSerializer