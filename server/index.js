import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fileStore from "./lib/memoryStore.js";
import authRoutes from "./routes/auth.js";

// load env from server/.env explicitly (if present)
dotenv.config({ path: "./server/.env" });

const app = express();
app.use(cors());
app.use(express.json());

// Global state for data store connection
let dbConnected = true;

// Middleware to check database connection status
app.use((req, res, next) => {
  res.locals.dbConnected = dbConnected;
  res.locals.store = fileStore;
  next();
});

app.use("/api/auth", authRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: "connected",
    database: "memory-store",
    message: "Backend is running with in-memory file-based storage"
  });
});

const PORT = process.env.PORT || 4000;

function start() {
  console.log("✅ Using in-memory file-based store (no external database required)");
  console.log("✅ Data persisted to: server/data/store.json");
  
  dbConnected = true;

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    console.log(`✅ All systems operational`);
  });
}

start();
