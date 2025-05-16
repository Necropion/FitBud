from training.data.db import SessionLocal
from training.models.workout_plan_model import WorkoutPlan
from training.serializers.workout_plan_serializer import WorkoutPlanSerializer

# Fetch All Workout Plans
def get_workout_plans():
    db = SessionLocal()
    try:
        workout_plans = db.query(WorkoutPlan).all()
        serializer = WorkoutPlanSerializer(workout_plans, many=True)
        return serializer.data
    except Exception as ex:
        return ex
    finally:
        db.close()

# Create Workout Plan
def create_workout_plan(workout_plan):
    db = SessionLocal()
    try:
        workout_plan = WorkoutPlan(**workout_plan)
        db.add(workout_plan)
        db.commit()
        db.refresh(workout_plan)
        return workout_plan
    except Exception as ex:
        return str(ex)

# Fetch All User Workouts
def fetch_user_workout_plans(user_id):
    db = SessionLocal()
    try:
        workout_plans = db.query(WorkoutPlan).filter(WorkoutPlan.user_id == user_id).all()
        serializer = WorkoutPlanSerializer(workout_plans, many=True)
        return serializer.data
    except Exception as ex:
        return str(ex)
    finally:
        db.close()