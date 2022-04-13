import { FETCH_ALL, CREATE, UPDATE, DELETE, LIKE } from '../constants/actionTypes';

const postsReducer = (posts = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return action.payload;  // Actual post
    case CREATE:
      return [...posts, action.payload];
    case DELETE:
      return posts.filter((post) => post._id !== action.payload);
      // filter() is return all elements that pass the test
    case UPDATE:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
      // action.payload is the newly updated post
    case LIKE:
      return posts.map((post) => (post._id === action.payload._id ? action.payload : post));
    default:
      return posts;
  }
};

export default postsReducer;