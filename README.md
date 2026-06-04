# Linz English Book Club

## Structure
```
├── frontend/   ← open index.html in browser
└── backend/    ← Node/Express API + MongoDB
```

## Run locally
```bash
cd backend
npm install
# create a .env file with your MONGODB_URI (see .env.example)
npm run seed    # populate database once
npm start       # start the server
```

Then open frontend/index.html in your browser.
