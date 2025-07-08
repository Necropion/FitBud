from training.data.db import SessionLocal
from training.models.workout_plan_model import WorkoutPlan
from training.serializers.workout_plan_serializer import WorkoutPlanSerializer
import logging

logger = logging.getLogger(__name__)

# Fetch All Workout Plans
def get_workout_plans():
    db = SessionLocal()
    try:
        workout_plans = db.query(WorkoutPlan).all()
        serializer = WorkoutPlanSerializer(workout_plans, many=True)
        return serializer.data
    except Exception as ex:
        logger.error(f"Error getting workout plans: {ex}")
        raise Exception("Error getting workout plans")
    finally:
        db.close()

# Create Workout Plan
def create_workout_plan(data: dict) -> WorkoutPlan:
    db = SessionLocal()
    try:
        workout_plan = WorkoutPlan(**data)
        db.add(workout_plan)
        db.commit()
        db.refresh(workout_plan)
        return workout_plan
    except Exception as ex:
        logger.error(f"Error creating workout plan: {ex}")
        raise Exception("Error creating workout plan")
    finally:
        db.close()

# Fetch All User Workout Plans
def fetch_user_workout_plans(user_id):
    db = SessionLocal()
    try:
        workout_plans = db.query(WorkoutPlan).filter(WorkoutPlan.user_id == user_id).all()
        serializer = WorkoutPlanSerializer(workout_plans, many=True)
        return serializer.data
    except Exception as ex:
        logger.error(f"Error getting workout plans: {ex}")
        raise Exception("Error getting users workout plans")
    finally:
        db.close()