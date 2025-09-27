# Campaign AI Backend

This FastAPI application provides the data and workflow APIs that power the Campaign AI Studio frontend. It exposes modular endpoints for managing users, AI-generated campaigns, chat conversations, integrations, workflow automation, and analytics snapshots.

## Project layout

```
backend/
├── app/
│   ├── api/             # FastAPI routers grouped by domain
│   ├── core/            # Configuration helpers
│   ├── db/              # Database session & base metadata
│   ├── models/          # SQLAlchemy ORM models
│   ├── schemas/         # Pydantic response/request models
│   ├── services/        # Business logic & CRUD helpers
│   └── main.py          # FastAPI application factory
├── alembic/             # Database migrations
├── alembic.ini          # Alembic configuration
├── requirements.txt     # Python dependencies
└── .env.example         # Environment variable template
```

## Getting started

1. **Create a virtual environment**

   ```bash
   python -m venv .venv
   source .venv/bin/activate
   ```

2. **Install dependencies**

   ```bash
   pip install -r requirements.txt
   ```

3. **Configure environment variables**

   ```bash
   cp .env.example .env
   # update DATABASE_URL to point at your PostgreSQL instance
   ```

4. **Run database migrations**

   ```bash
   alembic upgrade head
   ```

5. **Start the API**

   ```bash
   uvicorn app.main:app --reload
   ```

The service exposes interactive documentation at `http://localhost:8000/docs`.

## Database migrations

Alembic is preconfigured with an initial migration that creates the core tables used by the application. Additional migrations can be generated with:

```bash
alembic revision --autogenerate -m "describe changes"
```

## Testing the API quickly

```bash
curl http://localhost:8000/health
```

Use the `/api/v1` prefix for domain routes. For example, to create a campaign after seeding a user:

```bash
curl -X POST http://localhost:8000/api/v1/users \
  -H "Content-Type: application/json" \
  -d '{"email": "demo@example.com"}'
```

```bash
curl -X POST http://localhost:8000/api/v1/campaigns \
  -H "Content-Type: application/json" \
  -d '{"user_id": 1, "name": "Coffee Shop Launch", "objective": "Increase foot traffic"}'
```

The API is designed to be consumed asynchronously from the Next.js frontend using `fetch` or `axios`.
