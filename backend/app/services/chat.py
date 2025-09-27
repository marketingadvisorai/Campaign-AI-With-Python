from typing import List, Optional

from sqlalchemy.orm import Session

from app.models.chat_message import ChatMessage
from app.schemas.chat_message import ChatMessageCreate, ChatMessageUpdate


def get_messages(db: Session, campaign_id: int) -> List[ChatMessage]:
    return (
        db.query(ChatMessage)
        .filter(ChatMessage.campaign_id == campaign_id)
        .order_by(ChatMessage.created_at.asc())
        .all()
    )


def get_message(db: Session, message_id: int) -> Optional[ChatMessage]:
    return db.query(ChatMessage).filter(ChatMessage.id == message_id).first()


def create_message(db: Session, message_in: ChatMessageCreate) -> ChatMessage:
    db_message = ChatMessage(**message_in.model_dump())
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message


def update_message(db: Session, db_message: ChatMessage, message_in: ChatMessageUpdate) -> ChatMessage:
    for field, value in message_in.model_dump(exclude_unset=True).items():
        setattr(db_message, field, value)
    db.add(db_message)
    db.commit()
    db.refresh(db_message)
    return db_message


def delete_message(db: Session, db_message: ChatMessage) -> None:
    db.delete(db_message)
    db.commit()
