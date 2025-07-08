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
    description = Column(Text)
    deadline = Column(DateTime)
    created_at = Column(DateTime, default=datetime.datetime.utcnow)

    def to_dict(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "type": self.type,
            "target": self.target,
            "description": self.description,
            "deadline": self.deadline,
            "created_at": self.created_at,
        }