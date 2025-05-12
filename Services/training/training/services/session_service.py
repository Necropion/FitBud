from training.data.db import SessionLocal
from training.models.session_model import Session
from training.serializers.session_serializer import SessionSerializer

def get_sessions():
    db = SessionLocal()
    try:
        sessions = db.query(Session).all()
        serializer = SessionSerializer(sessions, many=True)
        return serializer.data
    except Exception as ex:
        return ex
    finally:
        db.close()