import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from 'url';

// Get the directory path of the current module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables before any other imports
try {
    const envPath = path.resolve(__dirname, '.env');
    const result = dotenv.config({ path: envPath });
    if (result.error) {
        throw new Error(`Error loading .env file: ${result.error.message}`);
    }
} catch (error) {
    console.error('Failed to load environment variables:', error.message);
    process.exit(1);
}

// Validate required environment variables with detailed error messages
const requiredEnvVars = {
    'PORT': 'Server port number',
    'MONGO_DB_URI': 'MongoDB connection string',
    'JWT_SECRET': 'JWT signing secret'
};

const missingEnvVars = Object.entries(requiredEnvVars)
    .filter(([key]) => !process.env[key])
    .map(([key, desc]) => `${key} (${desc})`);

if (missingEnvVars.length > 0) {
    console.error('Missing required environment variables:\n' + missingEnvVars.join('\n'));
    process.exit(1);
}

// Validate environment variable formats
try {
    if (isNaN(process.env.PORT)) {
        throw new Error('PORT must be a valid number');
    }
    
    const mongoUrlPattern = /^mongodb(\+srv)?:\/\/.+/;
    if (!mongoUrlPattern.test(process.env.MONGO_DB_URI)) {
        throw new Error('MONGO_DB_URI must be a valid MongoDB connection string');
    }
    
    if (process.env.JWT_SECRET.length < 32) {
        throw new Error('JWT_SECRET should be at least 32 characters long for security');
    }
} catch (error) {
    console.error('Environment variable validation failed:', error.message);
    process.exit(1);
}

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { app, server } from "./socket/socket.js";

// PORT should be assigned after calling dotenv.config() because we need to access the env variables.
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(cors({
    origin: process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : 'http://localhost:3000',
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Content-Length', 'Content-Type']
}));

// Add security headers and rate limiting
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';

// Rate limiting configuration
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: 'Too many requests from this IP, please try again later.',
    standardHeaders: true,
    legacyHeaders: false
});

// Apply rate limiting to all routes
app.use(limiter);

// Use Helmet for security headers
app.use(helmet());

// Custom security headers
app.use((req, res, next) => {
    // Allow cross-origin resource sharing for images and other resources
    res.setHeader('Cross-Origin-Resource-Policy', 'same-site');
    res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
    res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Origin', process.env.NODE_ENV === 'production' ? process.env.FRONTEND_URL : 'http://localhost:3000');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Length, Content-Type');
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    // Add Content-Security-Policy header with cloudinary domain
    res.setHeader('Content-Security-Policy', "default-src 'self' https: data: 'unsafe-inline' 'unsafe-eval'; img-src 'self' data: https: blob:; connect-src 'self' https:; frame-ancestors 'self';");
    next();
});

app.use(express.json({ limit: '50mb' })); // Increased limit for JSON payloads
app.use(express.urlencoded({ limit: '50mb', extended: true })); // For handling form data
app.use(cookieParser());

// Global error handler
app.use((err, req, res, next) => {
    console.error('Error:', err.message);
    console.error('Stack:', err.stack);
    
    // Handle specific types of errors
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            error: 'Validation Error',
            details: err.message
        });
    }
    
    if (err.name === 'UnauthorizedError') {
        return res.status(401).json({
            error: 'Authentication Error',
            details: 'Invalid or expired token'
        });
    }
    
    // Default error response
    res.status(err.status || 500).json({
        error: process.env.NODE_ENV === 'development' ? err.message : 'Internal server error',
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
});

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

// Graceful shutdown handling
process.on('SIGTERM', () => {
    console.log('Received SIGTERM signal. Starting graceful shutdown...');
    server.close(() => {
        console.log('Server closed. Process terminating...');
        process.exit(0);
    });
});

process.on('uncaughtException', (error) => {
    console.error('Uncaught Exception:', error);
    process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
    process.exit(1);
});

// Start server
server.listen(PORT, () => {
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`Server Running on port ${PORT}`);
    
    // Connect to MongoDB
    connectToMongoDB().catch(err => {
        console.error('Failed to connect to MongoDB:', err);
        process.exit(1);
    });
});
