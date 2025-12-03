import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { z } from "zod";
import { generateOTP, sendOTPEmail, verifyOTP } from "../lib/emailService.js";

const router = express.Router();

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Missing or invalid authorization header" });
  }

  const token = authHeader.substring(7);
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "secret");
    req.user = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

// Middleware to check database connection
router.use((req, res, next) => {
  if (!res.locals.dbConnected) {
    return res.status(503).json({ 
      message: "Database connection unavailable",
      error: "The database is currently offline. Please try again later."
    });
  }
  next();
});

// POST /api/auth/send-otp
router.post("/send-otp", async (req, res) => {
  try {
    const { email } = req.body;

    if (!email || !email.includes("@")) {
      return res.status(400).json({ message: "Valid email is required" });
    }

    const otp = generateOTP();
    await sendOTPEmail(email, otp);

    res.json({ 
      message: "OTP sent successfully to your email",
      email 
    });
  } catch (err) {
    console.error("Send OTP error:", err);
    res.status(500).json({ 
      message: "Failed to send OTP",
      error: err.message 
    });
  }
});

// POST /api/auth/verify-otp
router.post("/verify-otp", async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({ message: "Email and OTP are required" });
    }

    const result = verifyOTP(email, otp);

    if (!result.valid) {
      return res.status(401).json({ message: result.message });
    }

    res.json({ 
      message: "OTP verified successfully",
      email 
    });
  } catch (err) {
    console.error("Verify OTP error:", err);
    res.status(500).json({ 
      message: "Error verifying OTP",
      error: err.message 
    });
  }
});

// POST /api/auth/signup
const signupSchema = z.object({
  fullName: z.string().min(1).optional(),
  email: z.string().email(),
  username: z.string().min(3).optional(),
  password: z.string().min(6),
  otpVerified: z.boolean().optional(),
});

router.post("/signup", async (req, res) => {
  try {
    const parse = signupSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ message: "Invalid signup payload", errors: parse.error.format() });
    }

    const { fullName, email, username, password } = parse.data;
    const User = res.locals.User;

    // Check if user already exists
    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(409).json({ message: "Email already in use" });
    }

    // Hash password and create user
    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({
      fullName,
      email,
      username,
      password: hashed,
    });

    // Create JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "secret", {
      expiresIn: "7d",
    });

    res.status(201).json({ 
      message: "User created successfully", 
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        fullName: user.fullName 
      } 
    });
  } catch (err) {
    console.error("Signup error:", err);
    res.status(500).json({ 
      message: "Server error during signup",
      error: err.message 
    });
  }
});

// POST /api/auth/login
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

router.post("/login", async (req, res) => {
  try {
    const parse = loginSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ message: "Invalid login payload", errors: parse.error.format() });
    }

    const { email, password } = parse.data;
    const User = res.locals.User;

    // Find user in database
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare passwords
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Create JWT token
    const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET || "secret", {
      expiresIn: "7d",
    });

    res.json({ 
      message: "Authenticated successfully", 
      token, 
      user: { 
        id: user.id, 
        email: user.email, 
        fullName: user.fullName 
      } 
    });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ 
      message: "Server error during login",
      error: err.message 
    });
  }
});

// PUT /api/auth/update-profile
router.put("/update-profile", verifyToken, async (req, res) => {
  try {
    const updateProfileSchema = z.object({
      fullName: z.string().min(2, "Full name must be at least 2 characters").optional(),
      username: z.string().min(3, "Username must be at least 3 characters").optional(),
    });

    const parse = updateProfileSchema.safeParse(req.body);
    if (!parse.success) {
      return res.status(400).json({ 
        error: "Invalid update payload", 
        details: parse.error.format() 
      });
    }

    const { fullName, username } = parse.data;
    const User = res.locals.User;

    // Find user by ID from token
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    // Log before update
    console.log(`[PROFILE UPDATE] User ID: ${user.id}, Email: ${user.email}`);
    console.log(`[PROFILE UPDATE] Before - fullName: "${user.fullName}", username: "${user.username}"`);

    // Update user fields if provided
    if (fullName) user.fullName = fullName;
    if (username) user.username = username;

    await user.save();

    // Log after update
    console.log(`[PROFILE UPDATE] After - fullName: "${user.fullName}", username: "${user.username}"`);
    console.log(`[PROFILE UPDATE] Changes saved to database ✅`);

    res.json({
      message: "Profile updated successfully",
      user: {
        id: user.id,
        email: user.email,
        fullName: user.fullName,
        username: user.username,
      },
    });
  } catch (err) {
    console.error("Update profile error:", err);
    res.status(500).json({
      message: "Server error during profile update",
      error: err.message,
    });
  }
});

export default router;
