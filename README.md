# Dog Walking App

> A full‑stack, progressive web‑application that connects pet owners with professional dog walkers.
> **Built with**:
> • **Backend** – Express + TypeScript + Mongoose (MongoDB)
> • **Frontend** – Vite + React + TypeScript + Tailwind CSS
> • **PWA** – Service Workers, Push Notifications, Geolocation, Camera API, Install Prompt

---

## Table of Contents

- [Dog Walking App](#dog-walking-app)
  - [Table of Contents](#table-of-contents)
  - [Key Features to Implement](#key-features-to-implement)
    - [For Pet Owners](#for-pet-owners)
    - [For Dog Walkers](#for-dog-walkers)
  - [PWA Implementation Strategy](#pwa-implementation-strategy)
  - [Project Status](#project-status)
  - [Architecture](#architecture)
    - [Backend](#backend)
    - [Shared](#shared)
    - [Frontend](#frontend)
  - [Core Components](#core-components)
  - [Walker‑Specific Features](#walkerspecific-features)
  - [Walk Booking System](#walk-booking-system)
  - [Enhanced Features](#enhanced-features)
  - [Getting Started](#getting-started)
    - [API Base URL](#api-base-url)
  - [Contributing](#contributing)
  - [License](#license)

---

## Key Features to Implement

### For Pet Owners
- **Dog profile management** – Add, edit, delete dog details.
- **Schedule walks** – One‑time or recurring bookings.
- **Real‑time walk tracking** – Live GPS view.
- **Photo updates during walks** – Snap & upload pictures.
- **Walker ratings & reviews** – Rate and comment on walkers.
- **Payment integration** – Secure checkout (Stripe, PayPal, etc.).

### For Dog Walkers
- **Accept / decline walk requests** – Manage incoming bookings.
- **Route optimization for multiple dogs** – Plan efficient paths.
- **GPS tracking during walks** – Real‑time location sharing.
- **Photo capture & sharing** – Take photos during walks.
- **Earnings dashboard** – Track income & payouts.
- **Availability calendar** – Set working days & hours.

---

## PWA Implementation Strategy
| Feature | Description |
|---------|-------------|
| **Service Worker** | Cache API responses → offline viewing of past walks. |
| **Push Notifications** | Walk confirmations, status updates, reminders. |
| **Geolocation** | Real‑time tracking, route recording. |
| **Camera API** | Capture photos during walks. |
| **Install Prompts** | Encourage app installation via web‑app‑manifest. |

---

## Project Status
- ✅ Complete authentication system (JWT, register, login)
- ✅ Full user management (CRUD with proper security)
- ✅ Complete dog management (owner‑specific CRUD)
- ✅ Proper middleware & validation
- ✅ Type safety with shared types

---

## Architecture

### Backend
- **Express + TypeScript** – API server
- **Mongoose (MongoDB)** – Data persistence
- **JWT** – Authentication & session management
- **bcryptjs** – Password hashing

### Shared
- Common **types**, **utilities**, and **validation schemas** used by both client & server.

### Frontend
- **Vite** – Build tool
- **React + TypeScript** – UI
- **Tailwind CSS** – Styling
- **Axios** – API calls
- **React Router DOM** – Client‑side routing

---

## Core Components

- **Auth** – Login / Register forms, JWT handling, protected routes.
- **Dashboard** – Separate views for owners vs walkers.
- **Dog Management** – CRUD UI for dog profiles.
- **Walk Management** – Booking list, status updates, map view.
- **Wallet / Earnings** – Walker earnings dashboard.

---

## Walker‑Specific Features
- Additional **experience**, **availability**, **rating** fields in the User model.
- **Discovery / Search** endpoints to find walkers by location/ratings.
- **Profile management** – Update bio, profile picture, and services offered.

---

## Walk Booking System
1. **Walk model** – owner, walker, start/end time, status, route data, photos.
2. **Routes** – CRUD for walks, status transitions (`requested → accepted → in‑progress → completed`).
3. **Real‑time updates** – WebSocket or polling to sync status and location.

---

## Enhanced Features
- **Real‑time notifications** (Web Push, in‑app).
- **Rating / Review system** – Store scores & comments.
- **Payment integration** – Stripe Checkout / PayPal API.
- **Location / Mapping** – Google Maps / Mapbox for routes & geofencing.

---

## Getting Started

```bash
# Clone repo
git clone https://github.com/your-username/dog-walking-app.git
cd dog-walking-app

# Install deps
pnpm install

# Configure environment
cp .env.example .env
# Edit .env with your MongoDB URI, JWT secret, etc.

# Run development
pnpm dev  # Starts both backend (ts-node) & frontend (vite)

# Build for production
pnpm build
```

### API Base URL
```
http://localhost:4000/api
```

---

## Contributing

Pull requests are welcome!
Please follow the coding style guidelines and run the linter before submitting.

---

## License

[MIT](LICENSE)

---
