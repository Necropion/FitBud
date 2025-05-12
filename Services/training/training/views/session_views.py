from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from training.serializers import SessionSerializer
from training.services import session_service

class SessionViewSet(ViewSet):

    # Get All Exercises
    def list(self, request):
        sessions = session_service.get_sessions()
        return Response({
            "message": "Sessions fetched successfully",
            "data": sessions
        }, status=status.HTTP_200_OK)