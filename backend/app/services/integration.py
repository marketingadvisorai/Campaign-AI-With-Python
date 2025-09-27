from typing import List, Optional

from sqlalchemy.orm import Session

from app.models.integration import Integration
from app.schemas.integration import IntegrationCreate, IntegrationUpdate


def get_integrations(db: Session, user_id: int) -> List[Integration]:
    return db.query(Integration).filter(Integration.user_id == user_id).order_by(Integration.provider.asc()).all()


def get_integration(db: Session, integration_id: int) -> Optional[Integration]:
    return db.query(Integration).filter(Integration.id == integration_id).first()


def create_integration(db: Session, integration_in: IntegrationCreate) -> Integration:
    db_integration = Integration(**integration_in.model_dump())
    db.add(db_integration)
    db.commit()
    db.refresh(db_integration)
    return db_integration


def update_integration(db: Session, db_integration: Integration, integration_in: IntegrationUpdate) -> Integration:
    for field, value in integration_in.model_dump(exclude_unset=True).items():
        setattr(db_integration, field, value)
    db.add(db_integration)
    db.commit()
    db.refresh(db_integration)
    return db_integration


def delete_integration(db: Session, db_integration: Integration) -> None:
    db.delete(db_integration)
    db.commit()
