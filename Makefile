.PHONY: install-frontend install-backend dev-frontend dev-backend lint-frontend lint-backend test-backend

install-frontend:
cd frontend && npm install

install-backend:
python -m venv .venv && . .venv/bin/activate && pip install -r backend/requirements/dev.txt

dev-frontend:
cd frontend && npm run dev

dev-backend:
. .venv/bin/activate && cd backend && python manage.py runserver 0.0.0.0:8000

lint-frontend:
cd frontend && npm run lint

lint-backend:
. .venv/bin/activate && cd backend && python -m flake8

test-backend:
. .venv/bin/activate && cd backend && python manage.py test
