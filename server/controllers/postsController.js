import mongoose from "mongoose";

import Post from "../models/postModel.js";

export const getPosts = async (req, res) => {
  const { page } = req.query;

  try {
    const LIMIT = 6; // number of posts to show per page
    const startIndex = (Number(page) - 1) * LIMIT; // get the starting index of every page

    const total = await Post.countDocuments({}); // get the total number of posts
    const posts = await Post.find()
      .sort({ _id: -1 }) // sort by id in descending order (latest first)
      .limit(LIMIT)
      .skip(startIndex); // skip the first LIMIT posts

    res.json({
      data: posts,
      currentPage: Number(page),
      numberOfPages: Math.ceil(total / LIMIT),
    });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

// Query -> /posts?page=1 -> page = 1
// Params -> /posts/1 -> id = 1

export const getPostsBySearch = async (req, res) => {
  const { searchQuery, tags } = req.query;

  try {
    const title = new RegExp(searchQuery, "i");

    const posts = await Post.find({
      $or: [{ title }, { tags: { $in: tags.split(",") } }],
      // $or means if you find title or tags that matches
      // $in means that is there a tag in this specific array of tags that matches the query
    });

    res.json({ data: posts });
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;

  try {
    const post = await Post.findById(id);

    res.status(200).json(post);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const createPost = async (req, res) => {
  const post = req.body;

  const newPost = new Post({
    ...post,
    creator: req.userId,
    createdAt: new Date().toISOString(),
  });

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
  const updatedPost = await Post.findByIdAndUpdate(
    id,
    { ...post, id },
    { new: true }
  );

  res.json(updatedPost);
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  await Post.findByIdAndRemove(id);

  res.json({ message: "Post deleted successfully." });
};

export const likePost = async (req, res) => {
  const { id } = req.params;

  if (!req.userId)
    // Means that user is not authenticated
    return res.json({ message: "Unauthenticated" });

  if (!mongoose.Types.ObjectId.isValid(id))
    return res.status(404).send("No post with that id");

  const post = await Post.findById(id);

  const index = post.likes.findIndex((id) => id === String(req.userId)); // if id is equal to String of user id

  if (index === -1) {
    // If his id is not in index
    // Like the post
    post.likes.push(req.userId);
  } else {
    // Dislike the post
    post.likes = post.likes.filter((id) => id !== String(req.userId));
  }

  const updatedPost = await Post.findByIdAndUpdate(id, post, { new: true });

  res.json(updatedPost);
};
