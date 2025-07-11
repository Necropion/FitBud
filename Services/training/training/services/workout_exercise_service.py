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
def create_workout_exercises_list(workout_id, exercise_id_list):
    db = SessionLocal()
    try:
        workout_exercises = []

        for index, exercise_id in enumerate(exercise_id_list):
            workout_exercise = WorkoutExercise(
                workout_id=workout_id,
                exercise_id=exercise_id,
                order=index + 1,
                sets=3,
                reps=10,
                duration=10,
            )
            workout_exercises.append(workout_exercise)

        db.add_all(workout_exercises)
        db.commit()

        for obj in workout_exercises:
            db.refresh(obj)

        return workout_exercises
    except Exception as ex:
        logger.error(f"Error creating workout exercises list: {ex}")
        raise Exception("Error creating workout exercises list")

