from dataclasses import asdict
from training.data.db import SessionLocal
from training.models.workout_model import Workout
from training.serializers.workout_serializer import WorkoutSerializer
from . import workout_exercise_service
from training.models.dtos.workout_details_dto import WorkoutDetailsDTO

# Fetch All Workouts
def get_workouts():
    db = SessionLocal()
    try:
        workouts = db.query(Workout).all()
        serializer = WorkoutSerializer(workouts, many=True)
        return serializer.data
    except Exception as ex:
        return ex
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

