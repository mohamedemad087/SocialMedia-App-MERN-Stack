import express from "express";

import {
  getPostsBySearch,
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  commentPost,
} from "../controllers/postsController.js";
import auth from "../middleware/authMiddleware.js";

// Setup router
const router = express.Router();

// Adding routes
router.get("/search", getPostsBySearch);
router.get("/:id", getPost);
router.get("/", getPosts);

router.post("/", auth, createPost);
router.patch("/:id", auth, updatePost);
router.delete("/:id", auth, deletePost);
router.patch("/:id/likePost", auth, likePost);
router.post("/:id/commentPost", auth, commentPost);

export default router;
