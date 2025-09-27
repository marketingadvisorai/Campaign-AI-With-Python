from fastapi import APIRouter

from . import campaigns, integrations, users

api_router = APIRouter()
api_router.include_router(users.router)
api_router.include_router(campaigns.router)
api_router.include_router(integrations.router)

__all__ = ["api_router"]
