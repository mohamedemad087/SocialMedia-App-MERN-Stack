import React, { useState, useRef } from "react";
import { Typography, TextField, Button } from "@material-ui/core/";
import { useDispatch } from "react-redux";

import { addComment } from "../../actions/postsActions";
import useStyles from "./styles";

const Comments = ({ post }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState(post?.comments);
  const dispatch = useDispatch();
  const commentsRef = useRef();
  const classes = useStyles();

  const handleComment = async () => {
    const finalComment = `${user?.result?.name}: ${comment}`;

    const newComments = await dispatch(addComment(finalComment, post._id));

    setComment("");
    setComments(newComments);

    commentsRef.current.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div>
      <div className={classes.commentsOuterContainer}>
        <div className={classes.commentsInnerContainer}>
          <Typography gutterBottom variant="h6">
            Comments
          </Typography>

          {!comments.length && "No comments yet"}

          {comments?.map((comment, index) => (
            <Typography
              key={index}
              gutterBottom
              variant="subtitle1"
              ref={commentsRef}
            >
              <strong>{comment.split(": ")[0]}</strong>
              {comment.split(":")[1]}
            </Typography>
          ))}
        </div>

        {user?.result?.name && (
          <div style={{ width: "100%" }}>
            <Typography gutterBottom variant="h6">
              Write a comment
            </Typography>

            <TextField
              fullWidth
              minRows={4}
              variant="outlined"
              label="Comment"
              multiline
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <br />

            <Button
              style={{ marginTop: "10px" }}
              fullWidth
              disabled={!comment.length}
              color="primary"
              variant="contained"
              onClick={handleComment}
            >
              Comment
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;
