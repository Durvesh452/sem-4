# MongoDB Integration & Setup Guide

This project has been upgraded to support dynamic data persistence using **MongoDB**. The frontend pages now fetch plans dynamically from the database via Next.js API routes with a robust fallback mechanism.

---

## 🛠️ Step 1: Install Dependencies
To get started, make sure you install the new MongoDB client library. Run the following command in your terminal:
```bash
npm install
```
*(Since we added `"mongodb": "^6.5.0"` directly to `package.json`, a standard `npm install` will pull it in automatically!)*

---

## 📁 Step 2: Configure Environment Variables
Create a file named `.env.local` in the root of the project (if it doesn't already exist) and specify your MongoDB connection string:

```env
# MongoDB Connection String (Local or MongoDB Atlas)
MONGODB_URI=mongodb://localhost:27017/hidden_plans_hub
```

If you are using **MongoDB Atlas (Cloud)**, replace the URI with your Atlas connection string:
```env
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.xxxxx.mongodb.net/hidden_plans_hub?retryWrites=true&w=majority
```

---

## 🚀 Step 3: Start MongoDB
Ensure that your MongoDB service is running:
- **Local MongoDB**: Make sure the MongoDB Community Server service is running on port `27017`.
- **MongoDB Atlas**: Make sure your cluster is active and your local IP address is whitelisted in the Atlas Network Access panel.

---

## 🔄 How the Data Sync Works (Self-Seeding)
We have implemented a **Self-Seeding API route** at `/api/services`. 
- When the application boots and a user visits the site, the app hits the GET endpoint `/api/services`.
- The server connects to MongoDB and counts documents in the `services` collection.
- If the database is empty (count = 0), it automatically seeds the database with the full list of static plans from `src/data/plans.ts`.
- Subseqent loads are fetched directly from MongoDB.

### Fallback System (No Database Crashes)
If MongoDB is not running or the connection fails, the frontend components are designed to gracefully catch the error and fall back to the static `src/data/plans.ts` array. **The application will never crash** even if your database is down.

---

## 📡 API Endpoints
You can now interact with the database programmatically:

### 1. Fetch All Services
- **Endpoint**: `GET /api/services`
- **Description**: Returns all services and plans from MongoDB. Self-seeds if database is empty.

### 2. Insert a New Service/Plan
- **Endpoint**: `POST /api/services`
- **Content-Type**: `application/json`
- **Body Example**:
  ```json
  {
    "name": "Netflix Premium Pro",
    "logo": "🎬",
    "category": "movies",
    "description": "Premium Netflix deal with extra features.",
    "plans": [
      {
        "id": "netflix-pro-deal",
        "name": "Secret Ultra Plan",
        "type": "hidden",
        "priceMonthly": 199,
        "originalPriceMonthly": 649,
        "billingCycle": "monthly",
        "features": ["4K Ultra HD", "Spatial Audio", "4 Screens"],
        "isHidden": true,
        "whyHidden": "Secret promotion for select broadband partners.",
        "eligibility": ["Broadband user"],
        "successRate": 95,
        "unlockInstructions": ["Sign in through broadband provider dashboard"]
      }
    ]
  }
  ```
