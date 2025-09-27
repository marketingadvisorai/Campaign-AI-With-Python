from datetime import datetime

from pydantic import BaseModel, ConfigDict


class Timestamped(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    created_at: datetime | None = None
    updated_at: datetime | None = None
