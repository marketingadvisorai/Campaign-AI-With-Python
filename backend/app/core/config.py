from functools import lru_cache
from typing import List

from pydantic import AnyHttpUrl, Field
from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    project_name: str = "Campaign AI Platform"
    api_v1_str: str = "/api/v1"
    debug: bool = Field(default=False, alias="DEBUG")
    database_url: str = Field(
        default="postgresql+psycopg2://postgres:postgres@localhost:5432/campaign_ai",
        alias="DATABASE_URL",
    )
    cors_origins: List[AnyHttpUrl] | List[str] = Field(default_factory=list, alias="CORS_ORIGINS")
    access_token_expire_minutes: int = Field(default=60, alias="ACCESS_TOKEN_EXPIRE_MINUTES")

    model_config = {
        "env_file": ".env",
        "env_file_encoding": "utf-8",
        "case_sensitive": False,
    }


@lru_cache
def get_settings() -> Settings:
    return Settings()


settings = get_settings()
