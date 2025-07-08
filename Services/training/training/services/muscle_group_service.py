from training.data.db import SessionLocal
from training.models.muscle_group_model import MuscleGroup
from training.serializers.muscle_group_serializer import MuscleGroupSerializer
import logging

logger = logging.getLogger(__name__)

# Get All Muscle Groups
def get_muscle_groups():
    db = SessionLocal()
    try:
        muscle_groups = db.query(MuscleGroup).all()
        serializer = MuscleGroupSerializer(muscle_groups, many=True)
        return serializer.data
    except Exception as ex:
        logger.error(f"Error fetching muscle groups: {ex}")
        raise Exception("Error fetching muscle groups")
    finally:
        db.close()

# Create Muscle Group
def create_muscle_group(data: dict) -> MuscleGroup:
    db = SessionLocal()
    try:
        muscle_group = MuscleGroup(**data)
        db.add(muscle_group)
        db.commit()
        db.refresh(muscle_group)
        return muscle_group
    except Exception as ex:
        logger.error(f"Error creating muscle group: {ex}")
        raise Exception("Error creating muscle group")
    finally:
        db.close()

