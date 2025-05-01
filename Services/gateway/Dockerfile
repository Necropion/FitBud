# Use official Python slim base image
FROM python:3.11-slim

WORKDIR /code

RUN pip freeze > -r requirements.txt
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

# Set default env to production inside container
ENV ENV=production

EXPOSE 8000

# Run the FastAPI app using Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
