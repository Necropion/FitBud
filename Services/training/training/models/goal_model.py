from sqlalchemy import Column, String, DateTime, Text, BigInteger
from sqlalchemy.dialects.postgresql import UUID as pgUUID
from training.data.db import Base
import datetime

class Goal(Base):
    __tablename__ = 'goal'
    id = Column(BigInteger, primary_key=True)
    user_id = Column(pgUUID(as_uuid=True), nullable=False)  # Link to auth service
    type = Column(String)
    target = Column(Text)
    deadline = Column(DateTime)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)