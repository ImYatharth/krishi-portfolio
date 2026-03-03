# Deployment Guide

## Strapi CMS → Railway

1. **Push this repo to GitHub**
   ```bash
   git remote add origin https://github.com/YOUR_USER/krishi-portfolio.git
   git push -u origin master
   ```

2. **Create Railway project**
   - Go to [railway.app](https://railway.app) → New Project
   - Add a **PostgreSQL** service (click "+ New" → Database → PostgreSQL)
   - Add a **GitHub Repo** service → select your repo
   - Set root directory to: `apps/strapi`

3. **Set environment variables** on the Strapi service:
   ```
   DATABASE_CLIENT=postgres
   DATABASE_URL=${{Postgres.DATABASE_URL}}
   APP_KEYS=<generate-4-random-strings-comma-separated>
   API_TOKEN_SALT=<random-string>
   ADMIN_JWT_SECRET=<random-string>
   TRANSFER_TOKEN_SALT=<random-string>
   JWT_SECRET=<random-string>
   ENCRYPTION_KEY=<random-string>
   HOST=0.0.0.0
   PORT=1337
   FRONTEND_URL=https://yourdomain.com
   NODE_ENV=production
   ```
   Generate secrets with: `openssl rand -base64 32`

4. **Add custom domain** (optional):
   - Railway service → Settings → Networking → Custom Domain
   - Add `cms.yourdomain.com` → CNAME to Railway's provided domain

5. **After first deploy**, open your Strapi admin at the Railway URL:
   - Register a new admin account
   - Create an API token: Settings → API Tokens → Create new → Full Access
   - Configure public permissions: Settings → Users & Permissions → Roles → Public
     - Enable: Artwork (find, findOne), Category (find, findOne), About (find), Homepage (find), Contact-submission (create)

---

## Next.js Frontend → Vercel

1. **Import project in Vercel**
   - Go to [vercel.com](https://vercel.com) → Add New → Project
   - Import your GitHub repo
   - Set root directory to: `apps/frontend`
   - Framework: Next.js (auto-detected)

2. **Set environment variables**:
   ```
   NEXT_PUBLIC_STRAPI_URL=https://cms.yourdomain.com  (or Railway URL)
   STRAPI_API_TOKEN=<token-from-strapi-admin>
   REVALIDATION_SECRET=<random-string>
   NEXT_PUBLIC_SITE_URL=https://yourdomain.com
   ```

3. **Add custom domain**:
   - Vercel project → Settings → Domains
   - Add `yourdomain.com` and `www.yourdomain.com`

---

## DNS Records

```
A       @       76.76.21.21          (Vercel)
CNAME   www     cname.vercel-dns.com (Vercel)
CNAME   cms     <railway-domain>     (Railway)
```

---

## Strapi Webhook (for instant content updates)

After both are deployed, configure a webhook in Strapi admin:

1. Go to Settings → Webhooks → Create new webhook
2. Name: `Vercel Revalidation`
3. URL: `https://yourdomain.com/api/revalidate`
4. Headers: `x-revalidation-secret: <your-REVALIDATION_SECRET>`
5. Events: check all under Entry (create, update, publish, unpublish, delete)

---

## Local Development

```bash
pnpm install
pnpm dev        # Starts both Strapi (:1337) and Next.js (:3000)
```

Strapi admin: http://localhost:1337/admin
Frontend: http://localhost:3000
