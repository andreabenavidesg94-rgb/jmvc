# JMVC — SaaS landing + Paddle Billing

Plataforma de IA que crea campañas de Meta Ads, Google Ads y TikTok Ads.
Proyecto Next.js 14 (App Router) + TypeScript + Tailwind + Prisma (PostgreSQL) + Paddle Billing.

## Inicio rápido

```bash
# 1. Instalar dependencias
npm install

# 2. Copiar variables de entorno
cp .env.example .env.local
# (edita .env.local con tus valores reales)

# 3. Crear la base de datos PostgreSQL y migrar
npx prisma migrate dev --name init

# 4. Arrancar en desarrollo
npm run dev
```

Abre <http://localhost:3000>.

## Stack

- **Next.js 14** (App Router) + **TypeScript** estricto.
- **Tailwind CSS** con tema oscuro premium.
- **Prisma** + **PostgreSQL**.
- **Paddle Billing** (`@paddle/paddle-js` en cliente, `@paddle/paddle-node-sdk` en servidor).
- **lucide-react** para iconos.

## Estructura

```
src/
├─ app/                 → rutas App Router
│  ├─ api/              → webhook Paddle, customer portal, /me/subscription
│  ├─ (públicas)        → /, /pricing, /terms, /privacy, /cookies, /refunds, /contact
│  └─ (privadas)        → /login, /signup, /dashboard (placeholders)
├─ components/          → Header, Footer, JsonLd, LegalPage, landing/*
├─ lib/                 → site, plans, paddle/, auth/, db/
prisma/schema.prisma    → users, subscriptions, paddle_events
```

## Variables de entorno

Ver `.env.example`. Las críticas para producción:

- `DATABASE_URL` — PostgreSQL.
- `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN` — token público Paddle.js.
- `NEXT_PUBLIC_PADDLE_ENVIRONMENT` — `sandbox` o `production`.
- `NEXT_PUBLIC_PADDLE_PRICE_*` — los 6 price IDs (3 planes × mensual/anual).
- `PADDLE_API_KEY` — API key privada (jamás expuesta al cliente).
- `PADDLE_WEBHOOK_SECRET` — secret para verificar firma del webhook.

## Auth

`/login`, `/signup` y `/dashboard` son placeholders. Los helpers
`getCurrentUser()` y `requireUser()` están en `src/lib/auth/session.ts`
listos para conectar Auth.js / NextAuth sin cambiar el resto del código.

## Webhook de Paddle

`POST /api/paddle/webhook`:

1. Verifica la firma `Paddle-Signature` con el secret.
2. Guarda el evento en `paddle_events` para idempotencia.
3. Actualiza `subscriptions` y denormaliza el estado en `users`.

Configura el endpoint público en Paddle Dashboard → Notifications.

## Producción

Ver `PRODUCTION_CHECKLIST.md`.