import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import getMySQLConnection from "./lib/dbConfig.js";
import { defineUserModel } from "./models/User.js";
import authRoutes from "./routes/auth.js";

// load env from server/.env explicitly (if present)
dotenv.config({ path: "./server/.env" });

const app = express();
app.use(cors());
app.use(express.json());

// Global state for database connection
let dbConnected = false;
let User = null;

// Middleware to check database connection status
app.use((req, res, next) => {
  res.locals.dbConnected = dbConnected;
  res.locals.User = User;
  next();
});

app.use("/api/auth", authRoutes);

// Health check endpoint
app.get("/api/health", (req, res) => {
  res.json({ 
    status: dbConnected ? "connected" : "disconnected",
    database: dbConnected ? "MySQL" : "unavailable"
  });
});

const PORT = process.env.PORT || 4000;

async function start() {
  try {
    // Initialize MySQL connection
    const sequelize = getMySQLConnection();
    
    // Define User model
    User = defineUserModel(sequelize);
    
    // Authenticate and sync database
    await sequelize.authenticate();
    console.log("✅ Connected to MySQL database");
    
    // Sync the User model with the database
    await User.sync({ alter: true });
    console.log("✅ User model synced with database");
    
    dbConnected = true;
  } catch (err) {
    console.error("❌ Failed to connect to MySQL database:", err.message);
    console.error("Database connection is required. Please check your MySQL credentials and network connectivity.");
    console.error("\nRequired environment variables:");
    console.error("  - DB_HOST: " + (process.env.DB_HOST ? "✓ Set" : "✗ Not set"));
    console.error("  - DB_USER: " + (process.env.DB_USER ? "✓ Set" : "✗ Not set"));
    console.error("  - DB_PASS: " + (process.env.DB_PASS ? "✓ Set" : "✗ Not set"));
    console.error("  - DB_NAME: " + (process.env.DB_NAME ? "✓ Set" : "✗ Not set"));
    dbConnected = false;
  }

  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
    if (!dbConnected) {
      console.error("⚠️  WARNING: Database is not connected. Auth operations will fail.");
    }
  });
}

start();
