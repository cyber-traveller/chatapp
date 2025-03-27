import dotenv from "dotenv";
dotenv.config(); // Load environment variables

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";
import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure required environment variables are set
const requiredEnvVars = ["PORT", "MONGO_DB_URI", "JWT_SECRET"];
requiredEnvVars.forEach((key) => {
    if (!process.env[key]) {
        console.error(`Missing required environment variable: ${key}`);
        process.exit(1);
    }
});

// Validate environment variables
if (isNaN(process.env.PORT)) {
    console.error("PORT must be a valid number");
    process.exit(1);
}
if (!/^mongodb(\+srv)?:\/\/.+/.test(process.env.MONGO_DB_URI)) {
    console.error("Invalid MONGO_DB_URI format");
    process.exit(1);
}
if (process.env.JWT_SECRET.length < 32) {
    console.error("JWT_SECRET should be at least 32 characters long");
    process.exit(1);
}

// Define PORT
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Length", "Content-Type"]
}));

// Security Enhancements
import rateLimit from "express-rate-limit";
import helmet from "helmet";

// Rate Limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later.",
    standardHeaders: true,
    legacyHeaders: false
});
app.use(limiter);

// Apply security headers
app.use(helmet());

// Set CORS and security headers
app.use((req, res, next) => {
    res.setHeader("Cross-Origin-Resource-Policy", "same-site");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Origin", process.env.FRONTEND_URL || "http://localhost:3000");
    res.setHeader("Access-Control-Expose-Headers", "Content-Length, Content-Type");
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "SAMEORIGIN");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
});

// Middleware
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(cookieParser());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Serve frontend files (for full-stack deployment)
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Global Error Handling
app.use((err, req, res, next) => {
    console.error("Error:", err.message);
    console.error("Stack:", err.stack);

    const status = err.status || 500;
    res.status(status).json({
        error: process.env.NODE_ENV === "development" ? err.message : "Internal server error",
        ...(process.env.NODE_ENV === "development" && { stack: err.stack })
    });
});

// Graceful Shutdown
process.on("SIGTERM", () => {
    console.log("SIGTERM received, shutting down...");
    server.close(() => {
        console.log("Server closed.");
        process.exit(0);
    });
});
process.on("uncaughtException", (error) => {
    console.error("Uncaught Exception:", error);
    process.exit(1);
});
process.on("unhandledRejection", (reason, promise) => {
    console.error("Unhandled Rejection at:", promise, "reason:", reason);
    process.exit(1);
});

// Start Server
server.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || "development"} mode on port ${PORT}`);
    
    connectToMongoDB().catch((err) => {
        console.error("MongoDB Connection Failed:", err);
        process.exit(1);
    });
});
