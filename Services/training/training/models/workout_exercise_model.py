from sqlalchemy import Column, ForeignKey, BigInteger, Integer
from sqlalchemy.orm import relationship
from training.data.db import Base

class WorkoutExercise(Base):
    __tablename__ = 'workout_exercise'
    id = Column(BigInteger, primary_key=True)
    workout_id = Column(BigInteger, ForeignKey('workout.id'), nullable=False)
    exercise_id = Column(BigInteger, ForeignKey('exercise.id'), nullable=False)
    order = Column(Integer)
    sets = Column(Integer)
    reps = Column(Integer)
    duration = Column(Integer)  # In seconds

    workout = relationship("Workout", back_populates="exercises")
    exercise = relationship("Exercise")