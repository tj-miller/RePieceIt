# 📘 RePieceIt — Development Environment Guide

This project is a full-stack monorepo using:

- **Vite + React** (frontend)
- **NestJS** (backend)
- **Prisma ORM**
- **PostgreSQL (via Docker Compose)**
- **Shared TypeScript contracts**

This guide documents everything required to run and maintain the development backend (database + Prisma + Docker).

---

# 🐘 Database Setup (Docker + Postgres + pgAdmin)

The database stack is orchestrated using Docker Compose.  
Always run Docker commands from the **project root** (`RePieceIt`).

## Start the database

```bash
docker compose up -d
```

This starts:

| Service   | Purpose       | URL                   |
| --------- | ------------- | --------------------- |
| `db`      | PostgreSQL 16 | `localhost:5432`      |
| `pgadmin` | Web UI for DB | http://localhost:5050 |

## Stop the database

```bash
docker compose down
```

---

# 🔐 Environment Variables

Docker Compose reads from the root `.env`:

```
POSTGRES_PASSWORD=passwordHere
PGADMIN_DEFAULT_EMAIL=admin@repieceit.local
PGADMIN_DEFAULT_PASSWORD=passwordHere
```

These configure:

- Postgres password
- PgAdmin login email
- PgAdmin login password

**These secrets are NOT committed to GitHub — the real values are stored in LastPass.**

---

# 💾 Postgres Data Volume

Postgres stores its data in:

```
repieceit_data
```

To fully reset the DB:

```bash
docker compose down
docker volume ls
docker volume rm <actual-volume-name>
docker compose up -d
```

---

# 🧰 Prisma Setup

Prisma is inside the backend:

```
backend/prisma/schema.prisma
```

Backend loads its environment variables from:

```
backend/.env
```

Example:

```
DATABASE_URL=postgresql://repieceit:PasswordHere!@localhost:5432/repieceit
CLIENT_ORIGINS=http://localhost:5173
```

Prisma config:

```ts
import 'dotenv/config';
```

This ensures Prisma CLI commands pick up environment variables.

---

# 🧪 Prisma Commands

Run these **inside `/backend`**:

## Apply migrations

```bash
npx prisma migrate dev
```

## Open Prisma Studio

```bash
npx prisma studio
```

## Regenerate Prisma Client

```bash
npx prisma generate
```

## Reset database

```bash
npx prisma migrate reset
```

---

# 🧱 Backend (NestJS) Setup

Start the backend:

```bash
npm run dev
```

Responsibilities:

- Loads `.env`
- Connects via Prisma
- Serves `/api` routes
- Hot reload

Structure:

```
backend/
  src/
    accounts/
    prisma/
  prisma/
  .env
  prisma.config.ts
```

---

# 🎯 pgAdmin (Database Web UI)

Visit:

👉 http://localhost:5050

Use credentials from `.env`:

```
PGADMIN_DEFAULT_EMAIL
PGADMIN_DEFAULT_PASSWORD
```

Add a server in pgAdmin:

| Setting  | Value             |
| -------- | ----------------- |
| Host     | db                |
| Port     | 5432              |
| Username | repieceit         |
| Password | POSTGRES_PASSWORD |

---

# 🔐 Secrets

### Where secrets live:

- Root `.env`
- Backend `.env`
- **LastPass** (canonical source)

### Excluded in `.gitignore`:

```
.env
.env.*
backend/.env
frontend/.env
```

---

# 🧭 Development Workflow Summary

### 1. Start Docker services

```bash
docker compose up -d
```

### 2. Apply database migrations

```bash
cd backend
npx prisma migrate dev
```

### 3. View data

```bash
npx prisma studio
```

### 4. Start backend

```bash
npm run dev
```

### 5. Start frontend

```bash
npm run dev
```
