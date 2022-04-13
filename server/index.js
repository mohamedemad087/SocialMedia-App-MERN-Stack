import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from 'dotenv';

import postsRoutes from "./routes/postRoutes.js";
import usersRoutes from "./routes/userRoutes.js";

const app = express(); // Must be in the beginning of any express app
dotenv.config();

// Setup body parser that enable us to send post requests
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

// Cors is to enable cross origin requests
app.use(cors());

// using express middleware to connect routes to application
// This mean that every route should begin with http://localhost:5000/posts
// Must be after cors
app.use("/posts", postsRoutes);
app.use("/users", usersRoutes);

app.get('/', (req,res) => {
  res.send('Welcome to portfolio API');
})

const PORT = process.env.PORT || 5000;

// Using mongoose to connect database
mongoose.connect(process.env.CONNECTION_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Options are not required, but for not getting some errors or warnings in console
}).then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((err) => console.log(err));

// To make sure we get no warnings in console
mongoose.set("useFindAndModify", false);