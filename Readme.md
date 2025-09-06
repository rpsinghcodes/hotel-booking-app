# 🏨 Hotel Booking Web App

A **full‑stack hotel booking platform** where users can search, book, and pay for rooms online, while hotel owners can list properties, manage availability, upload images, and track revenue.

## 🧰 Tech Stack

**Frontend**

- React (Vite)
- Tailwind CSS
- Clerk (authentication)

**Backend**

- Node.js, Express
- MongoDB with Mongoose
- Cloudinary (image management)
- Nodemailer (email)
- Stripe (payments)
- Svix (webhooks / events)

---

## ✅ Prerequisites

- **Node.js** v18+ and **npm** v9+
- A **MongoDB URI** (Atlas or local)
- Accounts/keys for **Clerk**, **Cloudinary**, **Stripe**
- (Optional) Stripe CLI for local webhook testing

---

## 📦 Installation

> Recommended layout:

```
root/
  client/
  server/
```

### 1) Clone the repository

```bash
git clone <your-repo-url>.git
cd <your-project-folder>
```

### 2) Install dependencies

**Backend**

```bash
cd server
npm install
# If you don't have scripts yet, install common deps (already in your package.json in most cases):
# npm i express mongoose cors cookie-parser dotenv cloudinary nodemailer stripe svix
# Dev utils (optional): npm i -D nodemon
```

**Frontend**

```bash
cd ../client
npm install
# If needed, install app deps (already in your package.json in most cases):
# npm i react-router-dom axios @stripe/stripe-js @clerk/clerk-react
# Tailwind (already configured in your project): npm i -D tailwindcss postcss autoprefixer
```

---

## 🔐 Environment Variables

Create `.env` files **exactly** like below.

### Backend `.env`

```env
# db
MONGODB_URI=

# clerk
CLERK_PUBLISHABLE_KEY=
CLERK_SECRET_KEY=
CLERK_WEBHOOK_SECRET=

# cloudinary
CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_SECRET=

# nodemailer
NODE_MAILER_PASS=
NODE_MAILER_EMAIL=

# stripe
STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
STRIPE_WEBHOOK_SECRET=
```

### Frontend `.env`

> With Vite, env vars must be prefixed with `VITE_`.

```env
VITE_CLERK_PUBLISHABLE_KEY=
VITE_CLERK_SECRET_KEY=
VITE_BACKEND_ENDPOINT=
VITE_CURRENCY=
```

---

## ▶️ Run Locally

Open **two terminals**—one for backend, one for frontend.

**Backend**

```bash
cd server
# If your package.json has "dev": "nodemon server.js" (or index.js)
npm run dev
# Otherwise:
# npm start
# Or:
# node server.js
```

**Frontend**

```bash
cd client
npm run dev
# Vite dev server default: http://localhost:5173
```

---

## 📁 Project Structure (suggested)

```
root/
├─ server/
│  ├─ src/
│  │  ├─ models/
│  │  ├─ routes/
│  │  ├─ controllers/
│  │  ├─ configs/
│  │  └─ helper/
│  ├─ server.js
│  └─ package.json
└─ client/
   ├─ src/
   │  ├─ components/
   │  ├─ pages/
   │  ├─ context/
   |  |─ assets/
   │  └─ App.jsx
   └─ package.json
```

## 🤝 Contributing

PRs and issues are welcome. Please include steps to reproduce and environment details.
