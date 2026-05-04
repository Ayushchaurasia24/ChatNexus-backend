# ChatNexus — Backend

Node.js + Express + Socket.IO + MySQL backend for ChatNexus.

> **Full setup guide** → see the root `README.md` one level up.

---

## Quick Start

```bash
cp .env.example .env
# fill in DB credentials, JWT_SECRET, CLIENT_URL
npm install
npm run dev
# → http://localhost:5000
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start with nodemon (auto-reload) |
| `npm start` | Start for production (plain node) |

## Folder Structure

```
├── app.js                  Entry point
├── config/
│   ├── db.js               Sequelize connection
│   └── s3.js               AWS S3 client
├── controllers/            Route handlers
├── middleware/auth.js      JWT verify
├── models/                 Sequelize models
├── routes/                 Express routers
├── socket-io/              Socket.IO setup + handlers
└── utils/archiveMessages   Nightly message archiver
```

## Environment Variables

Copy `.env.example` to `.env` and fill in all values.  
See the root `README.md` for full description of each variable.

## Deployment

See **Backend → AWS EC2** section in root `README.md`.
