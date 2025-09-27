from datetime import datetime
from typing import Any, List, Optional

from pydantic import BaseModel, ConfigDict, Field

from app.schemas.chat_message import ChatMessage
from app.schemas.workflow import WorkflowStep
from app.schemas.analytics import AnalyticsSnapshot


class CampaignBase(BaseModel):
    name: str
    objective: Optional[str] = None
    budget: Optional[str] = None
    summary: Optional[str] = None
    configuration: dict[str, Any] = Field(default_factory=dict)
    status: Optional[str] = "draft"


class CampaignCreate(CampaignBase):
    user_id: int


class CampaignUpdate(BaseModel):
    name: Optional[str] = None
    objective: Optional[str] = None
    budget: Optional[str] = None
    summary: Optional[str] = None
    configuration: Optional[dict[str, Any]] = None
    status: Optional[str] = None


class Campaign(CampaignBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime
    messages: List[ChatMessage] = Field(default_factory=list)
    workflow_steps: List[WorkflowStep] = Field(default_factory=list)
    analytics_snapshots: List[AnalyticsSnapshot] = Field(default_factory=list)

    model_config = ConfigDict(from_attributes=True)
