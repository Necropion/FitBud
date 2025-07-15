from django.core.serializers import serialize
from training.data.db import SessionLocal
from training.models.workout_exercise_model import WorkoutExercise
from training.serializers.workout_exercise_serializer import WorkoutExerciseSerializer
import logging

logger = logging.getLogger(__name__)

# Get All Workout Exercises
def get_workout_exercises():
    db = SessionLocal()
    try:
        workout_exercises = db.query(WorkoutExercise).all()
        serializer = WorkoutExerciseSerializer(workout_exercises, many=True)
        return serializer.data
    except Exception as ex:
        return ex
    finally:
        db.close()


# Create Workout Exercise List
def create_workout_exercises_list(db, workout_plan_id, exercise_list):
    try:
        workout_exercises = [
            WorkoutExercise(workout_plan_id=workout_plan_id, **item)
            for item in exercise_list
        ]
        db.add_all(workout_exercises)

        return workout_exercises
    except Exception as ex:
        logger.error(f"Error creating workout exercises list: {ex}")
        raise Exception("Error creating workout exercises list")

