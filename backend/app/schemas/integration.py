from datetime import datetime
from typing import Any, Optional

from pydantic import BaseModel, ConfigDict, Field


class IntegrationBase(BaseModel):
    user_id: int
    provider: str
    status: Optional[str] = "disconnected"
    metadata: dict[str, Any] = Field(default_factory=dict)


class IntegrationCreate(IntegrationBase):
    pass


class IntegrationUpdate(BaseModel):
    status: Optional[str] = None
    metadata: Optional[dict[str, Any]] = None


class Integration(IntegrationBase):
    id: int
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)
