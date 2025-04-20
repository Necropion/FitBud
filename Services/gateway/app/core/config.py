import os
from dotenv import load_dotenv

load_dotenv()

AUTHENTICATION_SERVICE = os.getenv('AUTHENTICATION_SERVICE_URL', "http:localhost:5000")
EXERCISE_SERVICE = os.getenv('EXERCISE_SERVICE_URL', "http:localhost:5010")

SERVICE_ROUTES = {
    "authentication": AUTHENTICATION_SERVICE,
    "exercise": EXERCISE_SERVICE,
}