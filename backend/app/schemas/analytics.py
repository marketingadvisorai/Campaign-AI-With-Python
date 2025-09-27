from datetime import datetime
from typing import Any

from pydantic import BaseModel, ConfigDict, Field


class AnalyticsSnapshotBase(BaseModel):
    campaign_id: int
    metrics: dict[str, Any] = Field(default_factory=dict)


class AnalyticsSnapshotCreate(AnalyticsSnapshotBase):
    pass


class AnalyticsSnapshot(AnalyticsSnapshotBase):
    id: int
    captured_at: datetime

    model_config = ConfigDict(from_attributes=True)
