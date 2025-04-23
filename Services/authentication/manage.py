#!/usr/bin/env python
"""Django's command-line utility for administrative tasks."""
import os
import sys
from dotenv import load_dotenv

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'app.settings')
    try:
        load_dotenv()

        host = os.getenv('DJANGO_HOST')
        port = os.getenv('DJANGO_PORT')

        from django.core.management import execute_from_command_line

        # Inject host and port into the command if none given

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
