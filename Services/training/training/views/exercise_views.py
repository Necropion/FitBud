from rest_framework.viewsets import ViewSet
from rest_framework.response import Response
from rest_framework import status
from training.data.db import SessionLocal
from training.models.exercise_model import Exercise
from training.serializers import ExerciseSerializer

class ExerciseViewSet(ViewSet):

    def list(self, request):
        db = SessionLocal()
        try:
            exercises = db.query(Exercise).all()
            serializer = ExerciseSerializer(exercises, many=True)
            return Response(serializer.data)
        finally:
            db.close()

    def create(self, request):
        db = SessionLocal()
        try:
            serializer = ExerciseSerializer(data=request.data)
            if serializer.is_valid():
                # Create SQLAlchemy object manually
                exercise_data = serializer.validated_data
                exercise = Exercise(**exercise_data)

                db.add(exercise)
                db.commit()
                db.refresh(exercise)

                return Response(ExerciseSerializer(exercise).data, status=status.HTTP_201_CREATED)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        finally:
            db.close()