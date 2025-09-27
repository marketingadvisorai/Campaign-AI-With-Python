from collections.abc import Generator

from sqlalchemy.orm import Session

from app.db.session import get_db


def get_db_session() -> Generator[Session, None, None]:
    yield from get_db()
