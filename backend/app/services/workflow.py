from typing import List, Optional

from sqlalchemy.orm import Session

from app.models.workflow_step import WorkflowStep
from app.schemas.workflow import WorkflowStepCreate, WorkflowStepUpdate


def get_workflow_steps(db: Session, campaign_id: int) -> List[WorkflowStep]:
    return (
        db.query(WorkflowStep)
        .filter(WorkflowStep.campaign_id == campaign_id)
        .order_by(WorkflowStep.position.asc())
        .all()
    )


def get_workflow_step(db: Session, step_id: int) -> Optional[WorkflowStep]:
    return db.query(WorkflowStep).filter(WorkflowStep.id == step_id).first()


def create_workflow_step(db: Session, step_in: WorkflowStepCreate) -> WorkflowStep:
    db_step = WorkflowStep(**step_in.model_dump())
    db.add(db_step)
    db.commit()
    db.refresh(db_step)
    return db_step


def update_workflow_step(db: Session, db_step: WorkflowStep, step_in: WorkflowStepUpdate) -> WorkflowStep:
    for field, value in step_in.model_dump(exclude_unset=True).items():
        setattr(db_step, field, value)
    db.add(db_step)
    db.commit()
    db.refresh(db_step)
    return db_step


def delete_workflow_step(db: Session, db_step: WorkflowStep) -> None:
    db.delete(db_step)
    db.commit()
