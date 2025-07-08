from training.data.db import SessionLocal
from training.models.goal_model import Goal
from training.serializers.goal_serializer import GoalSerializer
import logging

logger = logging.getLogger(__name__)

# Fetch All Goals
def fetch_goals():
    db = SessionLocal()
    try:
        goals = db.query(Goal).all()
        serializer = GoalSerializer(goals, many=True)
        return serializer.data
    except Exception as ex:
        logger.error(f"Error getting all goals: {ex}")
        raise Exception("Error getting all goals")
    finally:
        db.close()

# Create Goal
def create_goal(data: dict) -> Goal:
    db = SessionLocal()
    try:
        goal = Goal(**data)
        db.add(goal)
        db.commit()
        db.refresh(goal)
        return goal
    except Exception as ex:
        logger.error(f"Error creating goal: {ex}")
        raise Exception(f"Error creating goal: {ex}")
    finally:
        db.close()

# Fetch All User Goals
def fetch_user_goals(user_id):
    db = SessionLocal()
    try:
        goals = db.query(Goal).filter(Goal.user_id == user_id).all()
        serializer = GoalSerializer(goals, many=True)
        return serializer.data
    except Exception as ex:
        logger.error(f"Error getting user goals: {ex}")
        raise Exception("Error getting user goals")
    finally:
        db.close()
