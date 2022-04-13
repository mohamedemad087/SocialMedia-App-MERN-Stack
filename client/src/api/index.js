import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:5000" });
//const API = axios.create({ baseURL: 'https://portfolio-web-application.herokuapp.com'});

// This will be happen before all requests
// We need this because we have to send our token back to our backend so, middleware can verify that we are actually logged in
// With that, backend will be able to get a specific header. based on that header we can do what done in authMiddleware (decode the data). then backend will know that user is indeed logged in
API.interceptors.request.use((req) => {
  const profile = localStorage.getItem("profile");

  if (profile) {
    req.headers.Authorization = `Bearer ${JSON.parse(profile).token}`;
  }

  return req;
});

export const fetchPosts = () => API.get("/posts");
export const createPost = (newPost) => API.post("/posts", newPost);
export const updatePost = (id, updatedPost) =>
  API.patch(`${"/posts"}/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`${"/posts"}/${id}`);
export const likePost = (id) => API.patch(`${"/posts"}/${id}/likePost`);

export const signIn = (FormData) => API.post("/users/signin", FormData);
export const signUp = (FormData) => API.post("/users/signup", FormData);
