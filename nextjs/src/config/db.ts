import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connectDB = async (
    uri: string = process.env.MONGODB_URI || ''
): Promise<typeof mongoose> => {
    if (!uri) {
        throw new Error('MongoDB connection URI is missing');
    }

    try {
        const connection = await mongoose.connect(uri);

        if (process.env.NODE_ENV !== 'production') {
            console.log(`MongoDB connected: ${connection.connection.host}`);
        } else {
            console.log('MongoDB connected successfully');
        }

        return connection;
    } catch (e: any) {
        console.error(`MongoDB connection error: ${e.message}`);
        process.exit(1);
    }
};

export default connectDB;
