import React, { useState } from "react";
import { Card, CardActions, CardContent, CardMedia, Button, Typography } from "@material-ui/core";
import ThumbUpAltIcon from "@material-ui/icons/ThumbUpAlt";
import ThumbUpAltOutlined from "@material-ui/icons/ThumbUpAltOutlined";
import DeleteIcon from "@material-ui/icons/Delete";
import MoreHorizIcon from "@material-ui/icons/MoreHoriz";
import moment from "moment";
import { useDispatch } from "react-redux"; // this allows to dispatch an action

import { useSpring, animated } from 'react-spring';

import Modal from './Modal/Modal';
import { likePost, deletePost } from "../../../actions/postsActions";
import useStyles from "./styles";

/* { post, setCurrentId} is to destructor the props*/
const Post = ({ post, setCurrentId }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const placeholderImage = "https://via.placeholder.com/150";
  const user = JSON.parse(localStorage.getItem('profile'));
  const [ imgSrc, setImgSrc ] = useState('');
  const [ showModal, setShowModal ] = useState(false);

  const Likes = () => {
    if (post.likes.length > 0) {
      // Checking if a current person likes something or if he didn't
      // Checking if the likes array contains the id of the current person (Google Id or Custom Id)
      return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
        ? (
          <div>
            <ThumbUpAltIcon fontSize="small" />&nbsp;{post.likes.length > 2 ? `You and ${post.likes.length - 1} others` : `${post.likes.length} like${post.likes.length > 1 ? 's' : ''}` }
          </div>
        ) : (
          <div>
            <ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length} {post.likes.length === 1 ? 'Like' : 'Likes'}
          </div>
        );
    }

    return (
      <div>
        <ThumbUpAltOutlined fontSize="small" />&nbsp;Like
      </div>
    );
  };

  const modalImg = () => {
    setImgSrc(post.selectedFile || placeholderImage);
    setShowModal(true);
  }

  const animation = useSpring({
    config: {
      duration: 250
    },
    opacity: showModal ? 1 : 0,

  });

  return (
    <>
    <Card className={classes.card}>
      <CardMedia className={classes.media} onClick={modalImg} image={post.selectedFile || placeholderImage} title={post.title}></CardMedia>

      <div className={classes.overlay}>
        <Typography variant="h6">{post.name}</Typography>
        <Typography variant="body2">{ moment(post.createdAt).fromNow() }</Typography>
      </div>

      {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
        <div className={classes.overlay2}>
          <Button
            style={{ color: "white" }}
            size="small"
            // setCurrentId(post._id) will change the currentId in the Form and in the App
            onClick={() => {setCurrentId(post._id)}}>
            <MoreHorizIcon fontSize="default" />
          </Button>
        </div>
      }

      <div className={classes.details}>
        <Typography variant="body2" color="textSecondary">
          {post.tags.map((tag) => `#${tag} `)}
        </Typography>
      </div>

      <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>

      <CardContent>
        <Typography variant="body2" color="textSecondary" component="p" gutterBottom>{post.message}</Typography>
      </CardContent>

      <CardActions className={classes.cardActions}>
        <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
          <Likes />
        </Button>

        {(user?.result?.googleId === post?.creator || user?.result?._id === post?.creator) &&
          <Button size="small" color="secondary" onClick={() => {dispatch(deletePost(post._id))}}>
            <DeleteIcon fontSize="small" />
            Delete
          </Button>
        }
      </CardActions>
    </Card>
    {showModal ?
      <animated.div style={animation}>
        <Modal imgSrc={imgSrc} showModal={showModal} setShowModal={setShowModal} />
      </animated.div>
    : ""}
    </>
  );
};

export default Post;
