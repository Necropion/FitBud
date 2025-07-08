from sqlalchemy import Column, String, Text, BigInteger
from training.data.db import Base

class MuscleGroup(Base):
    __tablename__ = 'muscle_group'
    id = Column(BigInteger, primary_key=True)
    name = Column(String(100), nullable=False, unique=True)
    description = Column(Text)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description
        }