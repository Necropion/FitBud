import os

from flask import Flask
from flask_cors import CORS
from .api.routes import proxy

def create_app():
    app = Flask(__name__)

    # Register Proxy Routes
    app.register_blueprint(proxy)

    # Allow Frontend Origin
    CORS(app, origins=['http://localhost:5173'])

    return app

app = create_app()

if __name__ == '__main__':
    port = int(os.environ.get("FLASK_RUN_PORT", 5500))
    app.run(port=port)