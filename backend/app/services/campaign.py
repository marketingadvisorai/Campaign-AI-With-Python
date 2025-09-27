from typing import List, Optional

from sqlalchemy.orm import Session

from app.models.campaign import Campaign
from app.schemas.campaign import CampaignCreate, CampaignUpdate


def get_campaign(db: Session, campaign_id: int) -> Optional[Campaign]:
    return db.query(Campaign).filter(Campaign.id == campaign_id).first()


def get_campaigns(db: Session, user_id: Optional[int] = None, skip: int = 0, limit: int = 100) -> List[Campaign]:
    query = db.query(Campaign)
    if user_id is not None:
        query = query.filter(Campaign.user_id == user_id)
    return query.offset(skip).limit(limit).all()


def create_campaign(db: Session, campaign_in: CampaignCreate) -> Campaign:
    db_campaign = Campaign(**campaign_in.model_dump())
    db.add(db_campaign)
    db.commit()
    db.refresh(db_campaign)
    return db_campaign


def update_campaign(db: Session, db_campaign: Campaign, campaign_in: CampaignUpdate) -> Campaign:
    for field, value in campaign_in.model_dump(exclude_unset=True).items():
        setattr(db_campaign, field, value)
    db.add(db_campaign)
    db.commit()
    db.refresh(db_campaign)
    return db_campaign


def delete_campaign(db: Session, db_campaign: Campaign) -> None:
    db.delete(db_campaign)
    db.commit()
