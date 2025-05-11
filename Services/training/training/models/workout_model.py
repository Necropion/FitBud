from sqlalchemy import Column, BigInteger, Text, String, DateTime
from sqlalchemy.dialects.postgresql import UUID as pgUUID
from sqlalchemy.orm import relationship
from training.data.db import Base
import datetime


class Workout(Base):
    __tablename__ = 'workout'
    id = Column(BigInteger, primary_key=True)
    user_id = Column(pgUUID(as_uuid=True), nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    exercises = relationship("WorkoutExercise", back_populates="workout")