import express from "express";

const app = express(); // create express app

app.use(express.json()); // parse incoming json requests

// routes import
import userRouter from "./routes/user.route.js";
import postRouter from "./routes/post.route.js";

// routes declaration
app.use("/api/v1/users", userRouter);
app.use("/api/v1/posts", postRouter);

// Root health-check endpoint
app.get("/", (req, res) => {
    res.status(200).json({
        message: "Intro to Backend Web Development API is up and running!",
        routes: {
            users: "/api/v1/users",
            posts: "/api/v1/posts"
        }
    });
});

export default app;
