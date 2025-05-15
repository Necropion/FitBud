from fastapi import FastAPI, HTTPException, Request, Response
from fastapi.responses import JSONResponse
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import os
import httpx

app = FastAPI()

# Decide Environment
env = os.getenv("ENV", "Development")

if env == "Production":
    load_dotenv(".env.Production")

if env == "Development":
    load_dotenv(".env.Development")

frontend_url = os.getenv("FRONTEND_URL")
allow_origins = ["http://localhost:5173"]
if frontend_url:
    allow_origins.append(frontend_url)

app.add_middleware(
    CORSMiddleware,
    allow_origins=allow_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


services = {
    "authentication": os.environ["AUTHENTICATION_SERVICE_URL"],
    "training": os.environ["TRAINING_SERVICE_URL"],
}

async def forward_request(service_url: str, method: str, path: str, body=None, headers=None, query_params=None):
    async with httpx.AsyncClient() as client:
        url = f"{service_url}{path}"
        response = await client.request(
            method,
            url,
            params=query_params,  # ✅ Pass query params here
            json=body,
            headers=headers
        )
        return response


@app.api_route("/{service}/{path:path}", methods=["GET", "POST", "PUT", "PATCH", "DELETE"])
async def gateway(service: str, path: str, request: Request):
    if service not in services:
        raise HTTPException(status_code=404, detail="Service not found")

    service_url = services[service]
    body = await request.json() if request.method in ["POST", "PUT", "PATCH"] else None
    headers = dict(request.headers)
    query_params = dict(request.query_params)  # ✅ Extract query params

    response = await forward_request(
        service_url,
        request.method,
        f"/{path}",
        body,
        headers,
        query_params
    )

    try:
        content = response.json()
        return JSONResponse(status_code=response.status_code, content=content)
    except Exception:
        return Response(status_code=response.status_code, content=response.text)

