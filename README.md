# Vastraa Fullstack (Frontend + Backend)

This project now includes:

- A `Next.js 14` frontend (`/`)
- A separate `Express` backend API (`/backend`)
- Checkout flow with sender + receiver address and email receipt

## Stack

- Frontend: Next.js, React, Tailwind CSS, Zustand
- Backend: Express, CORS, dotenv

## Project Structure

```txt
vastraa-frontend-main/
  app/                 # Next.js app routes
  components/          # UI components
  lib/
    api.js             # Frontend API base URL helper
  store/               # Zustand store
  backend/
    src/
      data/products.js # Product seed data
      server.js        # Express API server
    .env.example
    package.json
  .env.example
  package.json
```

## API Endpoints (Backend)

- `GET /api/health`
- `GET /api/products`
- `GET /api/products/:id`
- `POST /api/contact`
- `POST /api/orders`
- `GET /api/orders`

`POST /api/orders` now accepts cart items, sender address, receiver address, and `receiptEmail`, then sends full receipt over SMTP.

## Local Development

### 1) Install frontend dependencies

```bash
npm install
```

### 2) Install backend dependencies

```bash
npm install --prefix backend
```

### 3) Configure environment variables

Frontend (`.env.local`):

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000
```

Backend (`backend/.env`):

```env
PORT=5000
FRONTEND_URL=http://localhost:3000
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
SMTP_FROM=Vastraa <your-email@gmail.com>
```

### 4) Run both frontend + backend together

```bash
npm run dev:full
```

Or run separately:

```bash
npm run dev:frontend
npm run dev:backend
```

## Deployment Suggestions

### Option A (Recommended): Frontend on Vercel + Backend on Render/Railway

Why this is a good default:

- Very easy setup
- Good free tiers for small to medium traffic
- Clean separation of frontend and API

Steps:

1. Deploy frontend (`/`) to Vercel.
2. Deploy backend (`/backend`) to Render or Railway.
3. Set frontend env var in Vercel:
   `NEXT_PUBLIC_API_BASE_URL=https://your-backend-url`
4. Set backend env var:
   `FRONTEND_URL=https://your-frontend-domain`

### Option B: Fullstack on a Single VPS (Docker + Nginx)

Why choose this:

- Full control
- Useful when traffic or custom infrastructure grows

Tradeoff:

- More DevOps management (SSL, updates, monitoring, scaling)

### Option C: Keep Everything on One Platform

- You can deploy both services on the same provider (for example, both on Railway).
- Keep frontend and backend as two services and connect via environment variables.

## Production Checklist

- Set strict CORS origin in backend (`FRONTEND_URL`)
- Add a database (PostgreSQL or MongoDB) instead of in-memory arrays
- Add request rate limiting and input validation
- Add logging/monitoring (Sentry, Logtail, or platform logs)
- Add authentication before exposing order/customer endpoints publicly
