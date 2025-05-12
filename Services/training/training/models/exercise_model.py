from sqlalchemy import Column, String, DateTime, Text, BigInteger, Integer
from training.data.db import Base
import datetime

class Exercise(Base):
    __tablename__ = 'exercise'
    id = Column(BigInteger, primary_key=True)
    name = Column(String, nullable=False)
    duration = Column(Integer)
    intensity = Column(String)
    description = Column(Text)
    category = Column(String)
    equipment_required = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "duration": self.duration,
            "intensity": self.intensity,
            "description": self.description,
            "category": self.category,
            "equipment_required": self.equipment_required,
            "created_at": self.created_at.isoformat() if self.created_at else None,
        }