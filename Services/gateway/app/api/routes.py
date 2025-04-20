import httpx
from flask import Blueprint, request, Response
from ..core.config import SERVICE_ROUTES
import asyncio

proxy = Blueprint('proxy', __name__)

@proxy.route('/api/<service>/', defaults={"path": ""}, methods=["GET", "POST", "PUT", "DELETE"])
@proxy.route('/api/<service>/<path:path>', methods=['GET', 'POST', 'PUT', 'DELETE'])
def forward(service, path):
    if service not in SERVICE_ROUTES:
        return {"error": "Invalid service"}, 404

    base_url = SERVICE_ROUTES[service]
    target_url = f"{base_url.rstrip('/')}/{path.lstrip('/')}"

    async def forward_async():
        async with httpx.AsyncClient() as client:
            response = await client.request(
                method=request.method,
                url=target_url,
                headers={key: value for key, value in request.headers if key.lower() != "host"},
                data=request.get_data(),
                timeout=10.0
            )
            return response

    # Run the async part synchronously (Flask doesn't natively support async)
    response = asyncio.run(forward_async())

    return Response(response.content, status=response.status_code, headers=dict(response.headers))
