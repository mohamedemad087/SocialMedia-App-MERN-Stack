import {
  FETCH_ALL,
  FETCH_BY_SEARCH,
  CREATE,
  UPDATE,
  DELETE,
  LIKE,
} from "../constants/actionTypes";

const postsReducer = (state = [], action) => {
  switch (action.type) {
    case FETCH_ALL:
      return {
        ...state,
        posts: action.payload.data,
        currentPage: action.payload.currentPage,
        numberOfPages: action.payload.numberOfPages,
      };
    case FETCH_BY_SEARCH:
      return { ...state, posts: action.payload.data };
    case CREATE:
      return [...state, action.payload];
    case UPDATE:
      return state.map(
        (post) => (post._id === action.payload._id ? action.payload : post)
        // action.payload is the newly updated post
      );
    case DELETE:
      return state.filter((post) => post._id !== action.payload);
    // filter() is return all elements that pass the test
    case LIKE:
      return state.posts.map((post) =>
        post._id === action.payload._id ? action.payload : post
      );

    default:
      return state;
  }
};

export default postsReducer;
