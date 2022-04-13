import React from "react";
import { Grid, CircularProgress } from "@material-ui/core";
import { useSelector } from "react-redux"; // To fetch the data from global redux store

import Post from "./Post/Post";
import useStyles from "./styles";

const Posts = ({ setCurrentId }) => {
  const posts = useSelector((state) => state.posts); // Here it fetch all the posts
  // state refers to whole global redux store
  const classes = useStyles();

  return (
    !posts.length ? (<CircularProgress />) : (
      <Grid className={classes.container} container alignItems="stretch" spacing={3}>
        {/* {} to indicate we'll be using javascript logic */}
        {posts.map((post) => (
          <Grid key={post._id} item xs={12} sm={6}>
            <Post post={post} setCurrentId={setCurrentId} />
          </Grid>
        ))}
      </Grid>
    )
  );
};

export default Posts;
