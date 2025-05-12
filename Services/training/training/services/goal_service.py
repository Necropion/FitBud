from training.data.db import SessionLocal
from training.models.goal_model import Goal
from training.serializers.goal_serializer import GoalSerializer

# Get All Goals
def get_goals():
    db = SessionLocal()
    try:
        goals = db.query(Goal).all()
        serializer = GoalSerializer(goals, many=True)
        return serializer.data
    except Exception as ex:
        return ex
    finally:
        db.close()