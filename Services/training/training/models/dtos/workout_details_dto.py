from typing import List
from dataclasses import dataclass
from training.models import WorkoutExercise

@dataclass
class WorkoutDetailsDTO:
    id: int
    name: str
    exercises: List[WorkoutExercise]
