
# 👕 OUV Costumes

OUV Costumes is a full-stack e-commerce application for selling team shirts, built with a modern React frontend and a robust NestJS backend. It features admin dashboards, Stripe-powered payments, and a clean UI designed for responsiveness and usability.

> ⚠️ This project is for learning purposes only. No actual purchases will be processed.

## 📜 Table of Contents

- [✨ Features](#-features)
- [🛠 Technologies](#-technologies)
- [📥 Installation](#-installation)
  - [⚙ Requirements](#-requirements)
  - [📑 Environment Setup](#-environment-setup)
- [▶️ Running the Project](#-running-the-project)
  - [🎨 Frontend](#-frontend)
  - [🖥 Backend](#-backend)
- [📂 Project Structure](#-project-structure)
- [☁️ Deployment](#-deployment)
- [🎥 Demo](#-demo)

## ✨ Features

✅ **User Authentication:** Sign-up and login functionality.  
✅ **Stripe Checkout Integration:** Fully functional payment flow in test mode.  
✅ **Admin Dashboard:** Product management features restricted to authorized users.  
✅ **Product Catalog:** Browse and view shirt items available for purchase.  
✅ **Responsive UI:** Tailwind CSS and component libraries for polished UX.  

## 🛠 Technologies

### 🎨 Frontend:
- ⚛️ React + TypeScript
- ⚡ Vite
- 🎨 Tailwind CSS
- 🌐 Zustand (state management)
- 🧩 Shadcn/ui
- 🧹 ESLint & Prettier

### 🖥 Backend:
- 🚀 NestJS
- 🗄 Prisma ORM
- 💳 Stripe API
- 🐳 Docker Compose (optional)

## 📥 Installation

### ⚙ Requirements

- 🟢 Node.js (recommended LTS)
- 📦 PNPM or NPM
- 🗃 PostgreSQL (or compatible DB via Prisma)
- 🐳 Docker (optional)

## ▶️ Running the Project

### 🎨 Frontend

```bash
cd client
pnpm install
pnpm run dev
```

App will be available at [http://localhost:3000](http://localhost:5173)

### 🖥 Backend

```bash
cd server
pnpm install
pnpm prisma migrate dev
pnpm run start:dev
```

API will be running at [http://localhost:3001](http://localhost:2607)

## 📂 Project Structure

```
ouv-costumes/
├── client/             # Frontend (React, Vite, Tailwind)
│   ├── src/
│   │   ├── components/     # UI components (cards, forms, etc.)
│   │   ├── pages/          # Login, Register, Dashboard, etc.
│   │   └── store/          # Zustand state management
│   ├── public/
│   └── vite.config.ts
│
├── server/             # Backend (NestJS)
│   ├── src/
│   │   ├── auth/           # Auth module
│   │   ├── products/       # Product CRUD module
│   │   └── users/          # User roles & permissions
│   ├── prisma/             # Prisma schema and migrations
│   └── docker-compose.yaml
```

## ☁️ Deployment

* **🔧 Vercel**: `vercel.json` is provided for frontend deployment.
* **⚙️ Render**: Backend is hosted on [Render](https://render.com/).
* **🐳 Docker**: Use `docker-compose.yaml` for local development of the full stack.

## 🎥 Demo

🌐 Website: [https://ouv.vercel.app](https://ouv.vercel.app)
🔗 API: [https://ouv.onrender.com](https://ouv.onrender.com)

[![Watch the demo](https://img.youtube.com/vi/iG6xZd5ukhY/0.jpg)](https://www.youtube.com/watch?v=iG6xZd5ukhY)
