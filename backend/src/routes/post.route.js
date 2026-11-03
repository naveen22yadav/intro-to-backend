import { Router } from "express";
import {
    createPost,
    deletePost,
    getPostById,
    getPosts,
    updatePost
} from "../controllers/post.controller.js";

const router = Router();

// Tutorial specific endpoints
router.route("/create").post(createPost);
router.route("/getPosts").get(getPosts);
router.route("/getposts").get(getPosts);
router.route("/update/:id").patch(updatePost).put(updatePost);
router.route("/updatepost/:id").patch(updatePost).put(updatePost);
router.route("/delete/:id").delete(deletePost);
router.route("/deletepost/:id").delete(deletePost);

// Standard REST endpoints
router.route("/").get(getPosts).post(createPost);
router.route("/:id").get(getPostById).patch(updatePost).put(updatePost).delete(deletePost);

export default router;
