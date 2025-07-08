from training.data.db import SessionLocal
from training.models.exercise_model import Exercise
from training.serializers.exercise_serializer import ExerciseSerializer

# Get All Exercises
def get_exercises():
    db = SessionLocal()
    try:
        exercises = db.query(Exercise).all()
        serializer = ExerciseSerializer(exercises, many=True)
        return serializer.data
    except Exception as ex:
        return ex
    finally:
        db.close()

# Create Exercise
def create_exercise(data: dict) -> Exercise:
    db = SessionLocal()
    try:
        exercise = Exercise(**data)
        db.add(exercise)
        db.commit()
        db.refresh(exercise)
        return exercise
    finally:
        db.close()

# Delete Exercise
def delete_exercise(exercise_id):
    db = SessionLocal()
    try:
        exercise = db.query(Exercise).get(exercise_id)
        db.delete(exercise)
        db.commit()
        return exercise
    except Exception as ex:
        raise ex
    finally:
        db.close()

