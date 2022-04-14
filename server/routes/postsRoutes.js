import express from "express";

import {
  getPostsBySearch,
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
} from "../controllers/postsController.js";
import auth from "../middleware/authMiddleware.js";

// Setup router
const router = express.Router();

// Adding routes
router.get("/search", getPostsBySearch);
router.get("/", getPosts);
router.post("/", auth, createPost);
// :id is to make id dynamic
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);

export default router;
