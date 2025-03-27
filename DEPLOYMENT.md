create # Deploying MERN Chat App to Render

This guide will help you deploy the MERN Chat Application to Render.

## Prerequisites

1. A Render account (https://render.com)
2. A MongoDB Atlas database
3. A Cloudinary account for image uploads

## Deployment Steps

### 1. Prepare MongoDB Atlas

1. Create a MongoDB Atlas cluster if you haven't already
2. Get your MongoDB connection string
3. Replace the password and database name in the connection string

### 2. Set Up Cloudinary

1. Create a Cloudinary account if you haven't already
2. Note down your:
   - Cloud name
   - API Key
   - API Secret

### 3. Deploy on Render

1. Fork or upload this repository to your GitHub account
2. Log in to Render and click "New +"
3. Select "Blueprint" and connect your GitHub repository
4. Render will automatically detect the `render.yaml` configuration
5. Configure the following environment variables in Render dashboard:
   - `MONGO_DB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A secure random string (at least 32 characters)
   - `CLOUDINARY_CLOUD_NAME`: Your Cloudinary cloud name
   - `CLOUDINARY_API_KEY`: Your Cloudinary API key
   - `CLOUDINARY_API_SECRET`: Your Cloudinary API secret

### 4. Verify Deployment

1. Once deployed, Render will provide you with two URLs:
   - Backend API URL (e.g., https://mern-chat-backend.onrender.com)
   - Frontend URL (e.g., https://mern-chat-frontend.onrender.com)
2. The frontend will automatically connect to the backend using the configured environment variables

## Important Notes

- The free tier of Render may have cold starts
- The backend service will run on port 8080 in production
- Make sure all environment variables are properly set before deployment
- The frontend is configured to use the backend URL through VITE_API_BASE_URL environment variable