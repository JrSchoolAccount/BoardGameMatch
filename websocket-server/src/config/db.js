import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (uri = process.env.MONGODB_URI) => {
    if (!uri) {
        return Promise.reject(new Error('MongoDB connection URI is missing'));
    }

    try {
        const connection = await mongoose.connect(uri);

        if (process.env.NODE_ENV !== 'production') {
            console.log(`MongoDB connected: ${connection.connection.host}`);
        } else {
            console.log('MongoDB connected successfully');
        }

        return connection;
    } catch (e) {
        console.error(`MongoDB connection error: ${e.message}`);
        process.exit(1);
    }
};

export default connectDB;
