import mongoose from "mongoose";

import Post from "../models/postModel.js";

export const getPosts = async (req, res) => {
  try {
      const Posts = await Post.find();

      res.status(200).json(Posts);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
      const post = await Post.findById(id);

      res.status(200).json(post);
  } catch (error) {
      res.status(404).json({ message: error.message });
  }
}

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new Post({ ...post, creator: req.userId , createdAt: new Date().toISOString() });

  try {
    await newPost.save();

    res.status(201).json(newPost);
  } catch (error) {
    res.status(409).json({ message: error.message });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;
  const post = req.body;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  // new: true => is to can receive the updated version of post
  // { ...post, id } to tell that you want to
  const updatedPost = await Post.findByIdAndUpdate(id, { ...post, id }, { new : true });

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  await Post.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully."});
}

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId) // Means that user is not authenticated
    return res.json({ message: 'Unauthenticated' });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  const post = await Post.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId)); // if id is equal to String of user id

  if (index === -1) { // If his id is not in index
    // Like the post
    post.likes.push(req.userId);
  } else {
    // Dislike the post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await Post.findByIdAndUpdate(id, post, { new : true })

  res.json(updatedPost);
}