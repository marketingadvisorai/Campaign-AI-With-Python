from datetime import datetime
from typing import Any, Optional

from pydantic import BaseModel, ConfigDict, Field


class ChatMessageBase(BaseModel):
    campaign_id: int
    sender: str
    content: str
    metadata: dict[str, Any] = Field(default_factory=dict)


class ChatMessageCreate(ChatMessageBase):
    pass


class ChatMessageUpdate(BaseModel):
    content: Optional[str] = None
    metadata: Optional[dict[str, Any]] = None


class ChatMessage(ChatMessageBase):
    id: int
    created_at: datetime

    model_config = ConfigDict(from_attributes=True)
