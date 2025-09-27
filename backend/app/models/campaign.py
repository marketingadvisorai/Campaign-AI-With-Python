from datetime import datetime

from sqlalchemy import Column, DateTime, ForeignKey, Integer, String, Text
from sqlalchemy.dialects.postgresql import JSONB
from sqlalchemy.orm import relationship

from app.db.session import Base


class Campaign(Base):
    __tablename__ = "campaigns"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="CASCADE"), nullable=False)
    name = Column(String(255), nullable=False)
    objective = Column(String(255), nullable=True)
    budget = Column(String(120), nullable=True)
    summary = Column(Text, nullable=True)
    configuration = Column(JSONB, default=dict, nullable=False)
    status = Column(String(50), default="draft", nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow, nullable=False)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow, nullable=False)

    owner = relationship("User", back_populates="campaigns")
    messages = relationship("ChatMessage", back_populates="campaign", cascade="all, delete-orphan")
    workflow_steps = relationship("WorkflowStep", back_populates="campaign", cascade="all, delete-orphan")
    analytics_snapshots = relationship("AnalyticsSnapshot", back_populates="campaign", cascade="all, delete-orphan")
