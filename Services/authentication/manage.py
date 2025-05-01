import os
import sys
from dotenv import load_dotenv

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')

    # Load env FIRST
    env = os.getenv("ENV", "Development")

    if env == "Production":
        load_dotenv(".env.Production")
    else:
        load_dotenv(".env.Development")  # fallback to dev

    try:
        # ✅ Only access env vars *after* loading dotenv
        host = os.environ.get('DJANGO_HOST', 'localhost')
        port = os.environ.get('DJANGO_PORT', '8010')

        from django.core.management import execute_from_command_line

        if len(sys.argv) == 1 or (sys.argv[1] == 'runserver' and len(sys.argv) == 2):
            sys.argv += [f'{host}:{port}']

    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Are you sure it's installed and "
            "available on your PYTHONPATH environment variable? Did you "
            "forget to activate a virtual environment?"
        ) from exc

    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()
