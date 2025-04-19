import os
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
from .api import user_routes

load_dotenv()

def create_app():
    app = Flask(__name__)

    # Establish Routes
    app.register_blueprint(user_routes.user_bp)

    #Allow Frontend origins
    CORS(app, origins=["http://localhost:5173"])

    return app
