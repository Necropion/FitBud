from sqlalchemy import Column, ForeignKey, BigInteger, Integer
from sqlalchemy.orm import relationship
from training.data.db import Base

class WorkoutExercise(Base):
    __tablename__ = 'workout_exercise'
    id = Column(BigInteger, primary_key=True)
    workout_id = Column(
        BigInteger,
        ForeignKey('workout.id', ondelete="CASCADE"),
        nullable=True
    )
    workout_plan_id = Column(
        BigInteger,
        ForeignKey('workout_plan.id', ondelete="CASCADE"),
        nullable=True
    )
    exercise_id = Column(
        BigInteger,
        ForeignKey('exercise.id'),
        nullable=False
    )
    order = Column(Integer)
    sets = Column(Integer)
    reps = Column(Integer)
    duration = Column(Integer)

    workout = relationship("Workout", back_populates="exercises")
    workout_plan = relationship("WorkoutPlan", back_populates="exercises")
    exercise = relationship("Exercise")
