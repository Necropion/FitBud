FROM python:3.11-slim

WORKDIR /code

COPY requirements.txt .
RUN pip install -r requirements.txt

COPY . .

# Set default env to production inside container
ENV ENV=production

CMD ["python", "manage.py", "runserver", "0.0.0.0:8010"]
