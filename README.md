# Smart College Event Tracker (AWS DynamoDB + Render)

A mini-project to track college events with a React frontend, Node/Express backend, and Amazon DynamoDB as the only persistent storage (Free Tier). Backend and/or frontend can be deployed via Render; DynamoDB runs on AWS Free Tier.

## Stack

- Frontend: React (Create React App)
- Backend: Node.js + Express
- Database: Amazon DynamoDB (AWS Free Tier)
- Hosting:
  - Backend: Render (free web service)
  - Frontend: Render static site or AWS Amplify Hosting (free tier)

## Features

- List upcoming college events with filters (department, search by title)
- View full event details
- Admin page to create, edit, and delete events
- All event data stored in DynamoDB table `EventsTable`

## Getting started

### 1. DynamoDB setup

1. Log in to AWS Console.
2. Go to **DynamoDB → Tables → Create table**.
3. Table name: `EventsTable`
4. Partition key: `id` (String)
5. Keep default settings (on-demand capacity is fine for Free Tier for small usage).

### 2. Backend

cd backend
npm install
npm run dev



Environment variables (`backend/.env`):

- `AWS_REGION` – e.g. `ap-south-1`
- `AWS_ACCESS_KEY_ID` – IAM user key with DynamoDB access
- `AWS_SECRET_ACCESS_KEY` – IAM secret
- `PORT` – optional, default 5000

### 3. Frontend

cd frontend
npm install
npm start



Environment variable (`frontend/.env`):

- `REACT_APP_API_BASE_URL=http://localhost:5000`

### 4. Deployment (Render)

Backend:
- Root directory: `backend`
- Build command: `npm install`
- Start command: `npm start`

Frontend:
- Root directory: `frontend`
- Build command: `npm install && npm run build`
- Publish directory: `build`
- Env: `REACT_APP_API_BASE_URL=https://<your-backend>.onrender.com`
