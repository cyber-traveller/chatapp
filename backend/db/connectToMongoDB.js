import mongoose from "mongoose";

const connectToMongoDB = async () => {
    if (!process.env.MONGO_DB_URI) {
        throw new Error('MongoDB URI is not defined in environment variables');
    }

    try {
        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
            family: 4
        };

        await mongoose.connect(process.env.MONGO_DB_URI, options);
        console.log("Connected to MongoDB successfully");

        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err);
        });

        mongoose.connection.on('disconnected', () => {
            console.warn('MongoDB disconnected. Attempting to reconnect...');
        });

        mongoose.connection.on('reconnected', () => {
            console.log('MongoDB reconnected successfully');
        });

    } catch (error) {
        console.error("Failed to connect to MongoDB:", {
            message: error.message,
            code: error.code,
            name: error.name
        });
        throw error;
    }
};

export default connectToMongoDB;
