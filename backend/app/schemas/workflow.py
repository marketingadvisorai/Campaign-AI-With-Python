from typing import Any, Optional

from pydantic import BaseModel, ConfigDict, Field


class WorkflowStepBase(BaseModel):
    campaign_id: int
    title: str
    description: Optional[str] = None
    position: int = 0
    configuration: dict[str, Any] = Field(default_factory=dict)


class WorkflowStepCreate(WorkflowStepBase):
    pass


class WorkflowStepUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    position: Optional[int] = None
    configuration: Optional[dict[str, Any]] = None


class WorkflowStep(WorkflowStepBase):
    id: int

    model_config = ConfigDict(from_attributes=True)
