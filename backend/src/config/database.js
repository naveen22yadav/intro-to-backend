import mongoose from "mongoose";
import { DB_NAME } from "./constants.js";

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI;
        if (!mongoUri) {
            throw new Error("MONGODB_URI is not defined in environment variables");
        }

        const connectionInstance = await mongoose.connect(mongoUri, {
            dbName: DB_NAME,
            serverSelectionTimeoutMS: 5000
        });

        console.log(`\n MongoDB connected !!! Host: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1);
    }
};

export default connectDB;
