from typing import List

from sqlalchemy.orm import Session

from app.models.analytics_snapshot import AnalyticsSnapshot
from app.schemas.analytics import AnalyticsSnapshotCreate


def get_snapshots(db: Session, campaign_id: int) -> List[AnalyticsSnapshot]:
    return (
        db.query(AnalyticsSnapshot)
        .filter(AnalyticsSnapshot.campaign_id == campaign_id)
        .order_by(AnalyticsSnapshot.captured_at.desc())
        .all()
    )


def create_snapshot(db: Session, snapshot_in: AnalyticsSnapshotCreate) -> AnalyticsSnapshot:
    db_snapshot = AnalyticsSnapshot(**snapshot_in.model_dump())
    db.add(db_snapshot)
    db.commit()
    db.refresh(db_snapshot)
    return db_snapshot
