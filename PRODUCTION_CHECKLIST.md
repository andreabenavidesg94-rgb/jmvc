# JMVC — Checklist de producción y configuración Paddle

## Antes de lanzar

### Datos legales y placeholders
- [ ] Reemplazar todos los placeholders `[Nombre legal de la empresa]`, `[Dirección legal]`, `[Correo de soporte]`, `[País / jurisdicción]`, `[Número fiscal si aplica]` y `[Fecha de última actualización]` en `.env.local` y en `src/lib/site.ts` (constante `LAST_UPDATED`).
- [ ] **Revisión legal por profesional** de `/terms`, `/privacy`, `/cookies` y `/refunds` adaptada a tu jurisdicción.
- [ ] Firmar el DPA (Data Processing Agreement) con Paddle si tu base de usuarios incluye UE/UK.
- [ ] Implementar banner de cookies si tu jurisdicción lo requiere (UE, UK, ciertos estados de EE.UU.).

### Infraestructura
- [ ] Configurar dominio definitivo y certificado HTTPS.
- [ ] Migrar PostgreSQL a un proveedor gestionado (Neon, Supabase, Vercel Postgres, RDS, etc.).
- [ ] Configurar variables de entorno en Vercel/tu plataforma (entornos *production* y *preview* por separado).
- [ ] Backups automáticos de la base de datos.
- [ ] Logs y observabilidad (Sentry, Axiom, Logtail, Datadog, etc.).
- [ ] Rate limiting en `/api/*` (especialmente `/api/paddle/customer-portal`; el webhook ya es idempotente, pero conviene un throttling por IP).

### Auth
- [ ] Conectar Auth.js / NextAuth en `src/lib/auth/session.ts` (sustituir los stubs `getCurrentUser()` y `requireUser()`).
- [ ] Activar los formularios disabled en `/login`, `/signup` y `/contact`.
- [ ] Proteger `/dashboard` y rutas API privadas con verificación real de sesión.

### Activos visuales y SEO
- [ ] Generar `og-image.png` (1200×630).
- [ ] Generar `apple-touch-icon.png` (180×180).
- [ ] Verificar el sitio en Google Search Console y enviar `sitemap.xml`.
- [ ] Configurar Plausible / Google Analytics / Umami.

### Pruebas E2E del flujo de pago
- [ ] Signup → checkout (sandbox) → webhook recibido → fila en `paddle_events` y `subscriptions` → `users` denormalizado.
- [ ] Cancelar desde Customer Portal → webhook `subscription.canceled` → `cancelAtPeriodEnd=true` y `subscriptionStatus` actualizado.
- [ ] Renovación: en sandbox usar el time-travel de Paddle o esperar al ciclo.
- [ ] Pago fallido: probar tarjeta de fallo y verificar `past_due`.

---

## Configurar Paddle paso a paso

### A. Sandbox (desarrollo)

1. Crear cuenta en <https://sandbox-vendors.paddle.com>.
2. **Catalog → Products** → crear 3 productos: *Starter*, *Growth*, *Agency*.
3. Para cada producto, crear **2 prices** (mensual y anual, EUR). Copia los `pri_xxx` resultantes.
4. **Developer Tools → Authentication → Client-side tokens** → generar token y copiarlo a `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN`.
5. **Developer Tools → Authentication → API Keys** → generar key privada y copiarla a `PADDLE_API_KEY` (jamás en cliente).
6. **Developer Tools → Notifications → New endpoint**:
   - URL: `https://tu-dominio-de-pruebas/api/paddle/webhook` (en local puedes usar un túnel: `ngrok`, `cloudflared`, `tailscale funnel`).
   - Eventos a suscribir:
     - `subscription.created`
     - `subscription.updated`
     - `subscription.canceled`
     - `subscription.paused`
     - `subscription.resumed`
     - `subscription.past_due`
     - `transaction.completed`
   - Copiar el secret a `PADDLE_WEBHOOK_SECRET`.
7. **Checkout settings → Default Payment Link / Approved domains** → añadir tu dominio.
8. Probar: `npm run dev` → ir a `/pricing` → abrir checkout → completar con [tarjeta sandbox de Paddle](https://developer.paddle.com/concepts/payment-methods/credit-debit-card#test-payment-method) → verificar webhook y BBDD.

### B. Production

Repite los mismos pasos en <https://vendors.paddle.com> con los siguientes cambios:

1. Cambiar `NEXT_PUBLIC_PADDLE_ENVIRONMENT="production"`.
2. Generar nuevos tokens, API keys y webhook secret específicos de producción.
3. Actualizar todos los `NEXT_PUBLIC_PADDLE_PRICE_*` con los `pri_xxx` reales de production.
4. Verificar que tu cuenta de Paddle está aprobada y configurada con datos fiscales correctos.
5. Configurar la URL del webhook al endpoint de producción.
6. Realizar un primer cobro real de baja cuantía como prueba antes de anunciar el lanzamiento.

---

## Decisiones clave del proyecto

- **Stubs de auth, no auth completa**: `src/lib/auth/session.ts` define la API que usa el resto del código. Cuando conectes Auth.js, basta con cambiar la implementación. Esto permite lanzar la landing y la integración Paddle por separado.
- **Denormalización en `users`**: estado de suscripción duplicado en `User` (`plan`, `subscriptionStatus`, `currentPeriodEnd`, etc.) para lecturas rápidas en `/dashboard` sin hacer JOIN. La fuente de verdad sigue siendo `Subscription`.
- **Tabla `paddle_events` para idempotencia**: cada webhook se intenta insertar con `eventId` único. Si falla (P2002), es un reintento y se ignora. Devuelve 200 a Paddle para que no insista.
- **Price IDs en variables de entorno**: separa el código del catálogo. Cambias precios en Paddle sin tocar código y permite tener catálogos diferentes en sandbox y producción.
- **Server Components por defecto**: solo `'use client'` donde es imprescindible (Header con scroll, Pricing con toggle, Faq con accordion, ManageSubscriptionButton). El resto se renderiza en servidor.
- **Webhook devuelve 200 en duplicados, 500 en errores**: 200 le dice a Paddle "ya está, no reintentes"; 500 fuerza reintento, útil si hay un fallo transitorio de BBDD.
- **`custom_data.user_id` en el checkout**: el ID interno del usuario viaja en el checkout y vuelve en el webhook, eliminando ambigüedad sobre a quién pertenece la suscripción.
