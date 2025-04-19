from flask import Blueprint, jsonify, request
from ..services import exercise_service

exercise_bp = Blueprint('exercise', __name__, url_prefix='/exercise')

# GET All Exercises
@exercise_bp.route('/', methods=['GET'])
def get_exercises():

    exercises = exercise_service.fetch_exercises()
    print(exercises)

    return jsonify(exercises)