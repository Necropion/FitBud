import os
from flask import Flask
from dotenv import load_dotenv
from flask_cors import CORS
from .api import exercise_routes

load_dotenv()

def create_app():
    app = Flask(__name__)

    #Establish routes
    app.register_blueprint(exercise_routes.exercise_bp)

    # Allow Fronted Origins
    CORS(app, origins=['http://localhost:5173'])

    return app

app = create_app()

if __name__ == '__main__':
    port = int(os.getenv('FLASK_RUN_PORT', 5010))
    app.run(port=port)
