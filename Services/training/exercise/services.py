from .models import Exercise

# Fetch all Exercises
def fetch_exercises():

    exercises =  Exercise.objects.all()
    return exercises

# Fetch Single Exercise by ID
def fetch_exercise_by_id(exercise_id):

    exercise = Exercise.objects.get(id=exercise_id)
    return exercise

# Create a Single Exercise
def create_exercise(exercise):

    Exercise.objects.create(**exercise)
    return exercise