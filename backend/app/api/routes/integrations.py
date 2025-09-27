from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.deps.db import get_db_session
from app.schemas.integration import Integration, IntegrationCreate, IntegrationUpdate
from app.services.integration import (
    create_integration,
    delete_integration,
    get_integration,
    get_integrations,
    update_integration,
)

router = APIRouter(prefix="/integrations", tags=["integrations"])


@router.get("/", response_model=list[Integration])
def list_integrations(user_id: int, db: Session = Depends(get_db_session)):
    return get_integrations(db, user_id)


@router.post("/", response_model=Integration, status_code=status.HTTP_201_CREATED)
def create_integration_endpoint(integration_in: IntegrationCreate, db: Session = Depends(get_db_session)):
    return create_integration(db, integration_in)


@router.patch("/{integration_id}", response_model=Integration)
def update_integration_endpoint(
    integration_id: int,
    integration_in: IntegrationUpdate,
    db: Session = Depends(get_db_session),
):
    integration = get_integration(db, integration_id)
    if not integration:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Integration not found")
    return update_integration(db, integration, integration_in)


@router.delete("/{integration_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_integration_endpoint(integration_id: int, db: Session = Depends(get_db_session)):
    integration = get_integration(db, integration_id)
    if not integration:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Integration not found")
    delete_integration(db, integration)
    return None
