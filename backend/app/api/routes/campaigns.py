from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps.db import get_db_session
from app.schemas.analytics import AnalyticsSnapshot, AnalyticsSnapshotCreate
from app.schemas.campaign import Campaign, CampaignCreate, CampaignUpdate
from app.schemas.chat_message import ChatMessage, ChatMessageCreate
from app.schemas.workflow import WorkflowStep, WorkflowStepCreate, WorkflowStepUpdate
from app.services.analytics import create_snapshot, get_snapshots
from app.services.campaign import (
    create_campaign,
    delete_campaign,
    get_campaign as fetch_campaign,
    get_campaigns,
    update_campaign,
)
from app.services.chat import create_message, get_messages
from app.services.workflow import (
    create_workflow_step,
    delete_workflow_step,
    get_workflow_step,
    get_workflow_steps,
    update_workflow_step,
)

router = APIRouter(prefix="/campaigns", tags=["campaigns"])


@router.get("/", response_model=list[Campaign])
def list_campaigns(
    user_id: int | None = None,
    skip: int = 0,
    limit: int = 100,
    db: Session = Depends(get_db_session),
):
    return get_campaigns(db, user_id=user_id, skip=skip, limit=limit)


@router.post("/", response_model=Campaign, status_code=status.HTTP_201_CREATED)
def create_campaign_endpoint(campaign_in: CampaignCreate, db: Session = Depends(get_db_session)):
    return create_campaign(db, campaign_in)


@router.get("/{campaign_id}", response_model=Campaign)
def get_campaign_endpoint(campaign_id: int, db: Session = Depends(get_db_session)):
    campaign = fetch_campaign(db, campaign_id)
    if not campaign:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Campaign not found")
    return campaign


@router.patch("/{campaign_id}", response_model=Campaign)
def update_campaign_endpoint(campaign_id: int, campaign_in: CampaignUpdate, db: Session = Depends(get_db_session)):
    campaign = fetch_campaign(db, campaign_id)
    if not campaign:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Campaign not found")
    return update_campaign(db, campaign, campaign_in)


@router.delete("/{campaign_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_campaign_endpoint(campaign_id: int, db: Session = Depends(get_db_session)):
    campaign = fetch_campaign(db, campaign_id)
    if not campaign:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Campaign not found")
    delete_campaign(db, campaign)
    return None


@router.get("/{campaign_id}/messages", response_model=list[ChatMessage])
def get_campaign_messages(campaign_id: int, db: Session = Depends(get_db_session)):
    return get_messages(db, campaign_id)


@router.post("/{campaign_id}/messages", response_model=ChatMessage, status_code=status.HTTP_201_CREATED)
def add_campaign_message(campaign_id: int, message_in: ChatMessageCreate, db: Session = Depends(get_db_session)):
    if campaign_id != message_in.campaign_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Campaign mismatch")
    campaign = fetch_campaign(db, campaign_id)
    if not campaign:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Campaign not found")
    return create_message(db, message_in)


@router.get("/{campaign_id}/workflow", response_model=list[WorkflowStep])
def get_campaign_workflow(campaign_id: int, db: Session = Depends(get_db_session)):
    return get_workflow_steps(db, campaign_id)


@router.post("/{campaign_id}/workflow", response_model=WorkflowStep, status_code=status.HTTP_201_CREATED)
def add_workflow_step_endpoint(campaign_id: int, step_in: WorkflowStepCreate, db: Session = Depends(get_db_session)):
    if campaign_id != step_in.campaign_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Campaign mismatch")
    return create_workflow_step(db, step_in)


@router.patch("/{campaign_id}/workflow/{step_id}", response_model=WorkflowStep)
def update_workflow_step_endpoint(
    campaign_id: int,
    step_id: int,
    step_in: WorkflowStepUpdate,
    db: Session = Depends(get_db_session),
):
    step = get_workflow_step(db, step_id)
    if not step or step.campaign_id != campaign_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Workflow step not found")
    return update_workflow_step(db, step, step_in)


@router.delete("/{campaign_id}/workflow/{step_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_workflow_step_endpoint(campaign_id: int, step_id: int, db: Session = Depends(get_db_session)):
    step = get_workflow_step(db, step_id)
    if not step or step.campaign_id != campaign_id:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Workflow step not found")
    delete_workflow_step(db, step)
    return None


@router.get("/{campaign_id}/analytics", response_model=list[AnalyticsSnapshot])
def get_campaign_analytics(campaign_id: int, db: Session = Depends(get_db_session)):
    return get_snapshots(db, campaign_id)


@router.post("/{campaign_id}/analytics", response_model=AnalyticsSnapshot, status_code=status.HTTP_201_CREATED)
def add_campaign_analytics(campaign_id: int, snapshot_in: AnalyticsSnapshotCreate, db: Session = Depends(get_db_session)):
    if campaign_id != snapshot_in.campaign_id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Campaign mismatch")
    return create_snapshot(db, snapshot_in)
