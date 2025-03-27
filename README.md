# MERN Chat Application

A modern real-time chat application built with the MERN stack (MongoDB, Express.js, React, Node.js) featuring a beautiful Material-UI interface and real-time messaging capabilities.

![Demo App](https://github.com/user-attachments/assets/9aee0a85-70d4-490c-8e5c-40251acdf2c8)

![Demo App](https://github.com/user-attachments/assets/8ce8002d-9aa8-4a4b-849d-bf2fd918ffdc)

## Features

- 🎨 Modern Material-UI design with smooth animations
- 💬 Real-time messaging using Socket.io
- 🔐 User authentication with JWT
- 👥 User search functionality
- 🌟 Online user status tracking
- ⚡ Message animations and transitions
- 🔒 Protected routes and user sessions
- 📱 Responsive design for all devices
- ⚛️ State management with Zustand

## Tech Stack

### Frontend
- React.js with Vite
- Material-UI (MUI) for components
- Framer Motion for animations
- Zustand for state management
- Socket.IO client for real-time features

### Backend
- Node.js & Express.js
- MongoDB with Mongoose
- Socket.IO for real-time functionality
- JWT for authentication

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- MongoDB database
- npm or yarn package manager

### Installation

1. Clone the repository and navigate to the project directory

2. Install backend dependencies:
```bash
cd backend
npm install
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```

4. Set up environment variables in backend/.env:
```
PORT=5000
MONGO_DB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
NODE_ENV=development
```

### Running the Application

1. Start the backend server:
```bash
cd backend
npm run server
```

2. Start the frontend development server:
```bash
cd frontend
npm run dev
```

## Project Structure

```
├── backend/                # Backend server code
│   ├── controllers/        # Request handlers
│   ├── models/            # MongoDB models
│   ├── routes/            # API routes
│   ├── socket/            # Socket.IO implementation
│   └── server.js          # Server entry point
├── frontend/              # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── context/       # Context providers
│   │   ├── hooks/         # Custom hooks
│   │   ├── pages/         # Page components
│   │   └── zustand/       # State management
│   └── vite.config.js     # Vite configuration
```

## Usage

1. Register a new account or login with existing credentials
2. Search for other users using the search functionality
3. Click on a user to start a conversation
4. Send messages and enjoy real-time chat features
5. Experience smooth animations and modern UI

## Contributing

Contributions are welcome! Feel free to submit a Pull Request.

## License

This project is open source and available under the MIT License.
