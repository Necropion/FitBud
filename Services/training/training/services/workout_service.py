from dataclasses import asdict
from sqlalchemy import DateTime
from training.data.db import SessionLocal
from training.models.workout_model import Workout
from training.serializers.workout_serializer import WorkoutSerializer
from . import workout_exercise_service
from training.models.dtos.workout_details_dto import WorkoutDetailsDTO
import logging

logger = logging.getLogger(__name__)

# Fetch All Workouts
def fetch_workouts():
    db = SessionLocal()
    try:
        workouts = db.query(Workout).all()
        serializer = WorkoutSerializer(workouts, many=True)
        return serializer.data
    except Exception as ex:
        return str(ex)
    finally:
        db.close()


# Fetch AllUser Workouts
def fetch_user_workouts(user_id):
    db = SessionLocal()
    try:
        user_workouts = db.query(Workout).filter(Workout.user_id == user_id).all()
        serializer = WorkoutSerializer(user_workouts, many=True)
        return serializer.data
    except Exception as ex:
        logger.error(f"fetch_user_workouts error {ex}")
        raise Exception("Error fetching workouts")
    finally:
        db.close()


# Create Workout
def create_workout(workout):
    db = SessionLocal()
    try:
        workout = Workout(**workout)
        db.add(workout)
        db.commit()
        db.refresh(workout)
        return workout
    finally:
        db.close()


# Create Workout From Exercise Start
def create_with_exercise(exercise, user_id, exercise_id):
    db = SessionLocal()
    try:
        workout = Workout(
            user_id=user_id,
            name=f"Quick Workout - {exercise['name']}",
            description=f"Auto-generated workout started with the exercise '{exercise['name']}'."
        )

        db.add(workout)
        db.commit()
        db.refresh(workout)

        exercise_id_list = [exercise_id]
        workout_exercise_list = workout_exercise_service.create_workout_exercises_list(workout.id, exercise_id_list)

        # Construct Detailed Workout DTO
        workout_dto = WorkoutDetailsDTO(
            id=workout.id,
            name=workout.name,
            exercises=workout_exercise_list
        )

        return asdict(workout_dto)
    finally:
        db.close()


# Update Workout
from datetime import datetime

def update_workout(workout_update):
    db = SessionLocal()
    try:
        workout = db.query(Workout).get(workout_update["id"])
        if not workout:
            raise ValueError("Workout not found")

        # Define immutable or protected fields
        protected_fields = {"id", "user_id", "created_at"}

        for key, value in workout_update.items():
            if key in protected_fields:
                continue

            if hasattr(workout, key):
                # Handle special case: "ended_at": "now"
                if key == "ended_at" and value == "now":
                    setattr(workout, key, datetime.utcnow())
                else:
                    setattr(workout, key, value)

        db.commit()
        db.refresh(workout)
        return workout

    finally:
        db.close()



# Delete Workout
def delete_workout(workout_id):
    db = SessionLocal()
    try:
        workout = db.query(Workout).get(workout_id)
        db.delete(workout)
        db.commit()
        return workout
    except Exception as ex:
        raise ex
    finally:
        db.close()
