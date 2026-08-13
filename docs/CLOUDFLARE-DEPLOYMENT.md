# RIMA AFRICA — Cloudflare Pages Deployment Guide

## Build Settings (Cloudflare Dashboard ? Pages ? Create Project)
- Framework preset:     Next.js (Static HTML Export)
- Build command:        pnpm build
- Build output dir:     out
- Node.js version:      20.x

## Environment Variables (Cloudflare Dashboard ? Settings ? Env Vars)
Add every variable from .env.local to BOTH Preview and Production:
- NEXT_PUBLIC_R2_URL
- NEXT_PUBLIC_WHATSAPP_NUMBER
- NEXT_PUBLIC_SITE_URL
- RESEND_API_KEY
- RESEND_FROM_EMAIL
- RESEND_TO_EMAIL

## Deploy Workflow
1. Push code to GitHub
2. Connect GitHub repo in Cloudflare Pages
3. Set build settings above
4. Add environment variables
5. Deploy — Cloudflare builds and publishes automatically on every push

## Custom Domain
Pages ? Your project ? Custom Domains ? Add rimaafrica.com and www.rimaafrica.com

## Local Development
```powershell
cd $env:USERPROFILE\Desktop\rimaafrica
pnpm install
pnpm dev     # http://localhost:3000
pnpm build   # Test static export
```
