# 🔍 Lost & Found Tracker — Modern Community Platform

[![MERN Stack](https://img.shields.io/badge/Stack-MERN-blue.svg?style=for-the-badge&logo=react)](https://react.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS_v3-38B2AC.svg?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Animations-Framer_Motion-FF0055.svg?style=for-the-badge&logo=framer)](https://www.framer.com/motion/)
[![Cloudinary](https://img.shields.io/badge/Media-Cloudinary-3448C5.svg?style=for-the-badge&logo=cloudinary)](https://cloudinary.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

A modern, full-stack **MERN** (MongoDB, Express, React, Node.js) web application engineered to reunite people with their lost belongings. Featuring a redesigned glassmorphism interface, responsive mobile-first navigation, real-time keyword search, and secure direct-to-cloud photo uploads.

---

## 🌟 Key Features

* **🎨 Modern Glassmorphism UI:** Built with Tailwind CSS, custom gradients, smooth micro-interactions powered by Framer Motion, and responsive layouts for desktop, tablet, and mobile.
* **📱 Full Mobile Navigation:** Mobile drawer navigation with hamburger toggle, user avatar status, and instant action links.
* **🔍 Dual Directory Boards:** Separate visual listings for **Lost Items** (missing items seeking recovery) and **Found Items** (discovered items held by honest finders).
* **⚡ Live Search & Filtering:** Instant client-side filtering by item name, detailed keywords, or location.
* **📸 Direct Cloudinary Uploads:** High-resolution photo upload pipeline directly from the browser to Cloudinary without loading down the Express server.
* **🔒 JWT Authentication:** Secure stateless session management with bcrypt-hashed passwords and JSON Web Tokens.
* **📊 Member Dashboard ("My Listings"):** Dedicated dashboard for users to review their posted items, monitor claims, and delete completed listings.
* **🛡️ Safe Contact Modals:** Direct contact reveal modals with telephone and email links, along with community meeting safety guidelines.

---

## 🛠️ Technology Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React 18, React Router v6, Tailwind CSS v3, Framer Motion, Headless UI, React Icons, Axios, Formik & Yup, React Toastify |
| **Backend** | Node.js, Express.js (ES Modules), Mongoose, Cors, Dotenv |
| **Database** | MongoDB (Local Community Server or MongoDB Atlas Cloud) |
| **Cloud Storage** | Cloudinary REST API (Unsigned Direct Uploads) |
| **Authentication** | JSON Web Tokens (jsonwebtoken), Bcrypt.js |

---

## 📁 Repository Structure

```text
Lost-and-found-tracker/
├── .env.example             # Root reference of all environment variables
├── .gitignore               # Comprehensive Git ignore rules (protects .env and node_modules)
├── README.md                # Project documentation and execution instructions
├── client/                  # React Single-Page Application (SPA)
│   ├── .env                 # Local client environment variables (Git-ignored)
│   ├── .env.example         # Client environment template
│   ├── .gitignore           # Client-specific Git ignore rules
│   ├── package.json         # Client dependencies & scripts
│   ├── tailwind.config.js   # Tailored color palette, glassmorphism tokens, and animations
│   ├── public/              # Static HTML & assets
│   └── src/
│       ├── App.js           # Router configuration & Toast provider
│       ├── index.css        # Global CSS, font imports & scrollbar styles
│       ├── layout.js        # Main layout shell (Navbar + Content + Footer)
│       ├── constraints.js   # App session constraints
│       └── Components/
│           ├── Navbar.js             # Glassmorphism header with mobile drawer
│           ├── footer.js             # Modern dark footer with links & social icons
│           ├── Home.js               # Hero section, action cards, and 3-step guide
│           ├── LostItems.js          # Lost items board with live search
│           ├── FoundItems.js         # Found items board with live search
│           ├── Lost_item.js          # Post item form with multi-image upload
│           ├── ItemPage.js           # Detailed item view with photo gallery & modal
│           ├── MyListings.js         # User dashboard for active reports
│           ├── Login.js              # Authentication card with password toggle
│           ├── Signup.js             # Registration card with avatar preview
│           └── PaginationComponent.js # Custom rounded pagination pills
└── server/                  # Express.js REST API Backend
    ├── .env                 # Local server environment variables (Git-ignored)
    ├── .env.example         # Server environment template
    ├── .gitignore           # Server-specific Git ignore rules
    ├── package.json         # Server dependencies & scripts
    ├── app.js               # Express application entry point & MongoDB connection
    ├── controllers/
    │   ├── Items/           # Item CRUD controllers
    │   └── user/            # Authentication & profile controllers
    ├── middlewares/         # JWT verification middleware
    ├── models/              # Mongoose schemas (Item.js, User.js)
    ├── routes/              # Express route definitions
    └── utils/               # JWT generator utility
```

---

## 📋 Prerequisites

Before setting up the project locally, ensure you have the following installed on your system:

1. **Node.js** (v18.0.0 or higher recommended, e.g., v20+ or v24)
2. **npm** (comes packaged with Node.js) or **yarn**
3. **MongoDB**:
   * **Option A (Local):** [Install MongoDB Community Edition](https://www.mongodb.com/try/download/community) running on `mongodb://127.0.0.1:27017`
   * **Option B (Cloud):** A free [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) cluster connection string (`mongodb+srv://...`)
4. **Cloudinary Account (Free):**
   * Sign up at [cloudinary.com](https://cloudinary.com/)
   * In your Cloudinary Dashboard, obtain your **Cloud Name**.
   * Under **Settings > Upload > Upload presets**, add a new preset:
     * **Signing Mode:** Set to `Unsigned`
     * **Upload preset name:** e.g., `Lost-and-Found`

---

## ⚙️ Environment Variables Setup

Both the `server/` and `client/` directories require their own `.env` configuration file.

### 1. Server Environment (`server/.env`)

Create a `.env` file in the `server` directory (or copy from `server/.env.example`):

```bash
# In the server directory:
cp .env.example .env
```

Populate the variables:

```env
# Server Port
PORT=4000

# MongoDB Connection URI (Local or MongoDB Atlas)
DB=mongodb://127.0.0.1:27017/lost-found-mern

# Secret Key for JWT Token Signing
SECRET_KEY=your_super_secret_jwt_key_here

# Allowed Client Origin for CORS
CLIENT_URL=http://localhost:3000
```

### 2. Client Environment (`client/.env`)

Create a `.env` file in the `client` directory (or copy from `client/.env.example`):

```bash
# In the client directory:
cp .env.example .env
```

Populate the variables:

```env
# Backend API Base URL
REACT_APP_API_URL=http://localhost:4000

# Cloudinary Unsigned Upload Configuration
REACT_APP_CLOUDINARY_CLOUD_NAME=uutsacov
REACT_APP_CLOUDINARY_UPLOAD_PRESET=Lost-and-Found
```

---

## 🚀 Step-by-Step Installation & Running Instructions

### Step 1: Clone the Repository

```bash
git clone https://github.com/SriLakshmi9860/Lost-and-found-tracker.git
cd Lost-and-found-tracker
```

### Step 2: Configure Environment Files

Follow the [Environment Variables Setup](#️-environment-variables-setup) section above to ensure both `server/.env` and `client/.env` are present.

### Step 3: Install Dependencies

#### 3.1 Install Server Dependencies:
```bash
cd server
npm install
cd ..
```

#### 3.2 Install Client Dependencies:
```bash
cd client
npm install
cd ..
```

> **Note on React 18 / npm 7+:** If peer dependency conflicts occur with legacy packages, run:
> ```bash
> npm install --legacy-peer-deps
> ```

---

### Step 4: Run the Application

You will need **two terminal windows** (one for the backend and one for the frontend).

#### Terminal 1 — Start the Backend Server:

```bash
cd server
npm start
```
* Or for development with automatic restarts:
```bash
npm run dev
```
* Expected output:
```text
Database connection successful, running on PORT: 4000
```

#### Terminal 2 — Start the Frontend React App:

```bash
cd client
npm start
```
* The React development server will start and automatically open your browser at [http://localhost:3000](http://localhost:3000).

---

## 🌐 API Endpoints Reference

### Authentication & Users (`/users`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `POST` | `/users/create` | Register a new user account with hashed password | No |
| `POST` | `/users/login` | Authenticate user and return JWT token | No |
| `PUT` | `/users/update/:id` | Update user profile information | Yes (`token` header) |
| `POST` | `/users/renew` | Refresh user session token | Yes (`token` header) |

### Items (`/items` or `/Items`)
| Method | Endpoint | Description | Auth Required |
| :--- | :--- | :--- | :---: |
| `GET` | `/items` | Retrieve all community lost and found items | No |
| `GET` | `/items/:id` | Retrieve item details populated with poster profile | No |
| `POST` | `/items/newItem` | Submit a new item listing (photos, location, date) | Yes (`token` header) |
| `PUT` | `/items/update/:id` | Update an existing item report | Yes (`token` header) |
| `DELETE`| `/items/delete/:id` | Delete an item report | No |

---

## 💡 Troubleshooting & FAQs

### 1. MongoDB Connection Error: `connect ECONNREFUSED 127.0.0.1:27017`
* Ensure your local MongoDB service is running (`mongod` or via Windows Services / Docker).
* If using MongoDB Atlas, ensure your IP address is whitelisted in Atlas Network Access (`0.0.0.0/0` or current IP) and your URI credentials in `server/.env` are correct.

### 2. CORS Errors in the Browser Console
* Verify `REACT_APP_API_URL` in `client/.env` matches the port your server is running on (default `http://localhost:4000`).

### 3. Cloudinary Upload Fails on Post Item
* Verify that your Cloudinary upload preset is set to **Unsigned** in Cloudinary settings.
* Ensure `REACT_APP_CLOUDINARY_CLOUD_NAME` and `REACT_APP_CLOUDINARY_UPLOAD_PRESET` are properly set in `client/.env`.

### 4. Git Accidentally Staging `.env`
* Both `.gitignore` in root and individual directories ignore `.env`. If you previously committed `.env`, untrack it with:
```bash
git rm --cached server/.env client/.env
```

---

## 📄 License

This project is licensed under the [MIT License](LICENSE). Contributions, bug reports, and suggestions are always welcome!
