from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.api.routes import api_router
from app.core.config import settings


def create_application() -> FastAPI:
    app = FastAPI(title=settings.project_name, debug=settings.debug)

    if settings.cors_origins:
        app.add_middleware(
            CORSMiddleware,
            allow_origins=[str(origin) for origin in settings.cors_origins],
            allow_credentials=True,
            allow_methods=["*"],
            allow_headers=["*"],
        )

    # API router with prefix
    app.include_router(api_router, prefix=settings.api_v1_str)

    # health route
    @app.get("/health", tags=["health"])
    def health_check():
        return {"status": "ok"}

    # home route
    @app.get("/", tags=["home"])
    def home():
        return {"message": "Hello Campaign AI"}

    return app


app = create_application()
