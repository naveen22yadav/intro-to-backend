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
        console.error("\n❌ MongoDB connection failed:", error.message);
        if (error.message.includes("whitelist") || error.message.includes("Could not connect")) {
            console.error("\n💡 TIP: Please whitelist your IP in MongoDB Atlas:");
            console.error("   1. Open MongoDB Atlas (cloud.mongodb.com)");
            console.error("   2. Go to 'Network Access' under Security");
            console.error("   3. Click 'Add IP Address' -> Select 'Allow Access from Anywhere' (0.0.0.0/0)");
            console.error("   4. Save changes and re-run: npm run dev\n");
        }
        process.exit(1);
    }
};

export default connectDB;
