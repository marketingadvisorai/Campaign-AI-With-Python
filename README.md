# Campaign AI Platform

A fully modular full-stack starter that pairs a Django REST backend with a modern Next.js (JavaScript) frontend. The repository is organised for long-term maintainability with clearly separated domains, shared libraries, and deployment-ready configuration.

## Repository structure

```
.
├── backend/
│   ├── apps/
│   │   ├── accounts/            # Authentication, profile management, user-facing API
│   │   ├── campaigns/           # Campaign CRUD, audiences, and reporting APIs
│   │   └── core/                # Shared utilities, services, background helpers
│   ├── config/                  # Django project with environment-specific settings
│   ├── requirements/            # Base + development dependency lists
│   ├── manage.py                # Entry point for Django commands
│   └── .env.example             # Sample environment variables for local development
├── frontend/
│   ├── src/
│   │   ├── app/                 # Next.js App Router pages and layouts
│   │   ├── components/          # UI modules split by domain (campaigns, profile, layout)
│   │   └── lib/                 # HTTP client helpers
│   ├── public/                  # Static assets
│   ├── package.json             # Frontend dependencies and scripts
│   └── .env.local.example       # Frontend environment variables
├── Makefile                     # Cross-stack helper scripts
└── README.md
```

## Backend (Django)

### Key features

- Modular `apps/` folder with domain-driven modules (`accounts`, `campaigns`, `core`).
- Environment-aware settings split into `base.py`, `development.py`, and `production.py`.
- REST API built with Django REST Framework, JWT-ready configuration, and pagination defaults.
- CORS configuration aligned with the frontend (`NEXT_PUBLIC_API_BASE_URL`).
- Sample domain models for campaigns, audience segments, and performance metrics.

### Install dependencies

```bash
make install-backend
```

This command boots a local virtual environment (`.venv`) and installs dependencies from `backend/requirements/dev.txt`.

### Run the API server

```bash
make dev-backend
```

The server starts on `http://localhost:8000/` with automatic reloading.

### API overview

| Endpoint | Method(s) | Description |
| --- | --- | --- |
| `/api/accounts/profiles/me/` | `GET`, `PUT` | Retrieve or update the authenticated user profile. |
| `/api/accounts/profiles/` | CRUD | Staff-only management for all profiles. |
| `/api/campaigns/` | CRUD | Manage campaign records, nested audiences, and metrics. |

All endpoints require authentication. Swap the default Django session auth for JWT tokens or third-party auth providers as needed.

### Environment variables

Copy `backend/.env.example` to `backend/.env` and adjust for your environment. The defaults target SQLite for local development.

### Deployment notes

- Set `DJANGO_SETTINGS_MODULE=config.settings.production` in production.
- Configure `DJANGO_ALLOWED_HOSTS` with your domain.
- Point your WSGI/ASGI server (Gunicorn, Daphne, Uvicorn) at `config.wsgi:application` or `config.asgi:application`.
- Run database migrations during deployment: `python manage.py migrate`.

## Frontend (Next.js)

### Key features

- App Router structure in vanilla JavaScript (no TypeScript) with co-located domain components.
- `swr`-powered data fetching that talks to the Django REST API with the correct base URL.
- Dashboard UI featuring campaign management and user profile settings.
- Environment-driven API configuration via `NEXT_PUBLIC_API_BASE_URL`.

### Install dependencies

```bash
make install-frontend
```

### Run the development server

```bash
make dev-frontend
```

The app boots on `http://localhost:3000/` and proxies API requests directly to Django.

### Build for production

```bash
cd frontend
npm run build
```

### Deploying the frontend

- Configure `NEXT_PUBLIC_API_BASE_URL` to point at the live Django API (e.g. `https://api.example.com/api`).
- Deploy using your preferred provider (Vercel, Netlify, Docker). The build output lives in `.next/`.

## Connecting frontend and backend

1. Ensure Django is running on `http://localhost:8000/` (or update the frontend env variable).
2. The frontend fetch layer (`frontend/src/lib/api.js`) targets `${NEXT_PUBLIC_API_BASE_URL}` and includes credentials for session-based auth.
3. CORS and CSRF settings in `backend/config/settings/base.py` read from environment variables so the API accepts requests from the Next.js origin.

## Testing & quality

- `make lint-frontend` → Next.js ESLint checks.
- `make lint-backend` → Flake8 linting (configure `.flake8` as needed).
- `make test-backend` → Django test suite.

## Example development workflow

```bash
# 1. Install dependencies
make install-backend
make install-frontend

# 2. Copy environment files
cp backend/.env.example backend/.env
cp frontend/.env.local.example frontend/.env.local

# 3. Start servers (use two terminals)
make dev-backend
make dev-frontend
```

The frontend will render live data from the backend API, maintaining feature parity with the previous implementation while providing a cleaner, more maintainable foundation.
