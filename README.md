# Clinic Inventory Tracker

A lightweight inventory management app for healthcare clinics. Track medical supplies, get low-stock alerts, and manage suppliers.

## Features

- 📦 **Item catalog** — name, category, current stock, minimum threshold, supplier
- 🚨 **Low-stock alerts** — instant visual warning when inventory runs low
- ➕ **Add / edit / delete** items directly in the browser
- 📊 **Dashboard** — total items, low-stock count, categories breakdown
- 💾 **Local persistence** — data is saved to browser localStorage (demo mode)
- 📱 **Responsive UI** — works on desktop and mobile

## Tech stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- Lucide React

## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000

## Demo data

The app starts with a few sample supplies. Click "Reset demo data" to restore the initial set.

## Backend integration

Replace `lib/storage.ts` with API calls to your backend (REST/GraphQL) for production use.

## License

MIT
