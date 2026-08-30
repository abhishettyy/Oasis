<div align="center">

# 🧭 Oasis

### *Finding that one perfect spot in a desert of options*

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![Cloudinary](https://img.shields.io/badge/Cloudinary-3448C5?style=for-the-badge&logo=cloudinary&logoColor=white)

A full-stack travel listing platform where users can discover, share and review unique stays across the world.

</div>

---

## ✨ Features

- 🔐 **Authentication** — Email/password login and Google OAuth 2.0
- 🏠 **Listings** — Create, edit and delete travel listings with image uploads
- ⭐ **Reviews** — Leave star-rated reviews on any listing
- 🗺️ **Interactive Maps** — Leaflet.js maps with real-time geocoding
- 🔍 **Live Search** — Instant search by place name, location or country
- 👤 **User Profiles** — Update username, email and change password
- ☁️ **Cloud Images** — Cloudinary-powered image storage
- 🔒 **Authorization** — Ownership-based access control on all write operations
- 📦 **Session Persistence** — MongoDB-backed sessions via connect-mongo
- ✅ **Validation** — Joi server-side + Bootstrap client-side form validation

---

## 🛠️ Tech Stack

| Layer | Tech |
|-------|------|
| Runtime | Node.js |
| Framework | Express.js |
| Database | MongoDB + Mongoose |
| Templating | EJS |
| Auth | Passport.js (Local + Google OAuth 2.0) |
| Image Storage | Cloudinary + Multer |
| Maps | Leaflet.js + OpenStreetMap |
| Session Store | connect-mongo |
| Validation | Joi |
| UI | Bootstrap 5 + Custom CSS |

---

## 🚀 Getting Started

### Prerequisites
- Node.js v18+
- MongoDB (local or Atlas)
- Cloudinary account
- Google OAuth credentials

### Installation

```bash
# Clone the repo
git clone https://github.com/abhishettyy/Oasis.git
cd Oasis

# Install dependencies
npm install

# Create .env file
cp .env.example .env
# Fill in your credentials (see below)

# Start the server
npm run dev
```

### Environment Variables

Create a `.env` file in the root:

```env
DB_URL=mongodb://localhost:27017/oasis
SECRET=your_session_secret

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

---

## 📁 Project Structure

```
Oasis/
├── config/
│   ├── db.js              # MongoDB connection
│   ├── cloudinary.js      # Cloudinary setup
│   └── session.js         # Session config
├── controllers/           # Route handlers
├── models/
│   ├── listing.js         # Listing schema
│   ├── review.js          # Review schema
│   └── User.js            # User schema
├── public/
│   ├── css/               # Stylesheets
│   └── js/                # Client-side scripts
├── routes/
│   ├── listing.js         # Listing routes
│   ├── signin.js          # Auth routes
│   └── signup.js
├── utils/
│   ├── asyncWrap.js       # Async error handler
│   ├── expressError.js    # Custom error class
│   └── *Schema.js         # Joi validation schemas
├── views/
│   ├── includes/          # Partials (header, footer, flash)
│   └── listings/          # EJS templates
└── server.js              # Entry point
```

---

## 🔑 Key Implementation Details

**Authentication Flow**
- Local auth uses email as the unique identifier with bcrypt hashing via `passport-local-mongoose`
- Google OAuth merges accounts by email — if an email already exists, `googleId` is linked to the existing account
- Sessions persist in MongoDB with a 14-day TTL

**Authorization**
- Listing edit/delete checks `listing.owner._id === req.user._id`
- Review delete checks `review.author._id === req.user._id`
- All write routes protected with `req.isAuthenticated()`

**Image Upload**
- Multer handles `multipart/form-data` with memory storage
- Files are uploaded to Cloudinary via base64 buffer encoding
- `public_id` stored for future deletion support

---

## 📸 Screenshots

> *Add screenshots here*

---

## 📄 License

ISC © [Abhish Shetty](https://github.com/abhishettyy)
