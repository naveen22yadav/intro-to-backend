import dotenv from "dotenv";
import connectDB from "./config/database.js";
import app from "./app.js";

// Load environment variables
dotenv.config({
    path: "./.env"
});

const startServer = async () => {
    try {
        await connectDB();

        app.on("error", (error) => {
            console.error("Express App Error:", error);
            throw error;
        });

        const port = process.env.PORT || 4000;
        app.listen(port, () => {
            console.log(`🚀 Server is running at http://localhost:${port}`);
        });
    } catch (error) {
        console.error("Server startup failed:", error);
    }
};

startServer();
