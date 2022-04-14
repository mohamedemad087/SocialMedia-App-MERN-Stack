import React, { useState, useEffect } from "react";
import { Container, Grow, Grid, Paper } from "@material-ui/core";
import { useDispatch } from "react-redux"; // this allows to dispatch an action

import { getPosts } from "../../actions/postsActions";
import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Pagination from "../Pagination.jsx";
import useStyles from "./styles";

const Home = () => {
  const [currentId, setCurrentId] = useState(null);

  const classes = useStyles();

  const dispatch = useDispatch();

  return (
    <Grow in>
      <Container>
        <Grid
          className={classes.gridContainer}
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={6} md={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <Pagination />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
