from sqlalchemy import Column, DateTime, ForeignKey, Text, BigInteger
from sqlalchemy.dialects.postgresql import UUID as pgUUID
from sqlalchemy.orm import relationship
from training.data.db import Base
import datetime

class Session(Base):
    __tablename__ = 'session'
    id = Column(BigInteger, primary_key=True)
    user_id = Column(pgUUID(as_uuid=True), nullable=False)
    workout_id = Column(BigInteger, ForeignKey('workout.id'), nullable=False)
    started_at = Column(DateTime, default=datetime.datetime.utcnow)
    ended_at = Column(DateTime)
    notes = Column(Text)

    workout = relationship("Workout")