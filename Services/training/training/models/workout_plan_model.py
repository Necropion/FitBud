from sqlalchemy import Column, DateTime, String, Text, BigInteger
from sqlalchemy.dialects.postgresql import UUID as pgUUID
from sqlalchemy.orm import relationship
from training.data.db import Base
import datetime

class WorkoutPlan(Base):
    __tablename__ = 'workout_plan'
    id = Column(BigInteger, primary_key=True)
    user_id = Column(pgUUID(as_uuid=True), nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text)
    goal_id = Column(BigInteger, nullable=False)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
    notes = Column(Text)

    exercises = relationship(
        "WorkoutExercise",
        back_populates="workout_plan",
        cascade="all, delete-orphan",
        passive_deletes=True
    )

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': str(self.user_id) if self.user_id else None,
            'name': self.name,
            'description': self.description,
            'goal_id': self.goal_id,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'notes': self.notes,
        }