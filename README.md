# Campaign AI Monorepo

This repository now houses the Campaign AI admin experience as a Next.js 14 application located in `apps/admin`. The legacy Vite dashboard has been retired in favour of the App Router architecture so that server components, API route handlers, and Supabase integration all live in one place.

## Getting started

Use the Node.js version declared in `package.json` (`^18.18` or `^20`) when working on the project. The development containers and CI pipelines currently run Node 20.19.4; if you use `nvm` you can match this by running `nvm install 20 && nvm use 20`. We also recommend letting Corepack manage the exact pnpm release shipped with the repo:

```bash
corepack use pnpm@9.9.0
pnpm install
pnpm dev
```

`pnpm install` runs at the repository root and installs the dependencies for every workspace package. Enabling Corepack ensures you are using a pnpm build compatible with the supported Node versions so installs do not fail on newer Node releases. The new root `package.json` exposes convenience scripts that scope commands to the Next.js admin dashboard so you no longer need to change directories manually. Under the hood `pnpm dev` is equivalent to `pnpm --filter admin dev`.

## Available scripts

The package in `apps/admin` exposes the following scripts:

- `pnpm dev` – start the development server (`next dev`)
- `pnpm build` – build the production bundle (`next build`)
- `pnpm start` – run the production server (`next start`)
- `pnpm lint` – execute Next.js linting (`next lint`)

## Environment variables

Create a `.env.local` file inside `apps/admin` (or configure the variables in Vercel) with the following keys:

| Variable | Description |
| --- | --- |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL (e.g. `https://your-project.supabase.co`). |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous client key used by the browser. |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key used by API route handlers. **Store securely (Vercel Server Env).** |

## Backend service

The `backend/` directory contains a FastAPI application with modular routers for users, campaigns, workflow automation, integrations, chat conversations, and analytics snapshots. It uses PostgreSQL via SQLAlchemy and Alembic for migrations. See [`backend/README.md`](backend/README.md) for detailed setup instructions.

Run the backend locally with:

```bash
cd backend
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
alembic upgrade head
uvicorn app.main:app --reload
```

The FastAPI server exposes the REST API at `http://localhost:8000/api/v1` and a health check at `http://localhost:8000/health`.

## API routes

All Supabase Edge Function endpoints from the previous implementation now live under Next.js route handlers in `apps/admin/src/app/api/make-server-5efafb23/*`. The client no longer calls `https://<project>.supabase.co/functions/v1/...`; instead the dashboard issues relative requests (e.g. `/api/make-server-5efafb23/user/setup-status`).

## Deployment

`vercel.json` points Vercel at `apps/admin`. The default commands assume a monorepo workflow:

- Install dependencies once at the repository root with `pnpm install`.
- Build via the root script `pnpm build` which scopes to the admin app.
- Output is automatically taken from `apps/admin/.next` by Vercel’s Next.js integration.

If Vercel prompts you for a *Root Directory*, leave the default (`.`). The project level `vercel.json` takes care of targeting the Next.js application and avoids the API error about `rootDirectory`.

## Directory overview

```
apps/
  admin/
    public/
    src/
      app/
        api/        # Route handlers mirroring Supabase edge functions
        components/ # Reused dashboard/UI components
      lib/          # Supabase helpers (browser + service clients, KV helpers)
backend/
  app/
    api/            # FastAPI routers
    models/         # SQLAlchemy ORM models
    schemas/        # Pydantic models
    services/       # Domain business logic
```
