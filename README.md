# ShopVerse - Simple Multi-Vendor E-Commerce (No Database Setup Needed)

## Stack
- Frontend: React + Bootstrap
- Backend: Node.js + Express
- Data storage: JSON file (server/data/db.json) — no MySQL/XAMPP needed!

## How to Run

### 1. Start the backend server
Open a terminal:
```
cd server
npm install
npm start
```
This runs on http://localhost:5000

### 2. Start the frontend (in a NEW terminal)
```
cd client
npm install
npm start
```
This opens http://localhost:3000 in your browser automatically.

## Test Login
- Email: admin@shopverse.com
- Password: admin123

Or just click Register to create a new buyer/seller account.

## Folder Structure
```
shopverse-simple/
├── server/          <- Node.js + Express backend
│   ├── index.js
│   ├── data/db.json <- acts as the database
│   └── package.json
└── client/          <- React frontend
    ├── src/
    │   ├── pages/
    │   ├── components/
    │   └── context/
    └── package.json
```

## Notes
- No XAMPP, no MySQL, no PHP needed.
- Data resets are easy — just edit/delete server/data/db.json and restart the server.
- Keep BOTH terminals running (server + client) at the same time.
