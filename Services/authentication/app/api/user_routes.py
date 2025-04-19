from flask import Blueprint, jsonify, request
from ..services import user_services

# Create Blueprint
user_bp = Blueprint("user", __name__, url_prefix="/users")

# GET All Users
@user_bp.route("/", methods=["GET"])
def get_users():

    users = user_services.fetch_users()
    print(users)

    return jsonify(users)
