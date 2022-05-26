import { DELETE_BLOG, GET_BLOG_LIST } from "../constants/Type";

const initialValues = {
  blogs: null,
  loading: true,
};

const BlogReducer = (state = initialValues, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_BLOG_LIST:
      return {
        ...state,
        blogs: payload,
        loading: false,
      };
    case DELETE_BLOG:
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog._id !== payload),
        loading: false,
      };
    default:
      return state;
  }
};

export default BlogReducer;
