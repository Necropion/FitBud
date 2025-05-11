from sqlalchemy import Column, String, DateTime, Text, BigInteger
from training.data.db import Base
import datetime

class Exercise(Base):
    __tablename__ = 'exercise'
    id = Column(BigInteger, primary_key=True)
    name = Column(String, nullable=False)
    description = Column(Text)
    category = Column(String)
    equipment_required = Column(String)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)
