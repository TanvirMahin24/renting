import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_BLOG,
  CREATE_BLOG_ERROR,
  DELETE_BLOG,
  DELETE_BLOG_ERROR,
  GET_BLOG_LIST,
  UPDATE_BLOG,
  UPDATE_BLOG_ERROR,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";

//GET Blog LIST
export const getBlogList = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/blogs`);
    dispatch({
      type: GET_BLOG_LIST,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// CREATE Blog
export const createBlog = (values, image) => async (dispatch) => {
  const formData = new FormData();
  formData.append("title", values.title);
  formData.append("description", values.description);
  formData.append("featured", values.featured);

  // Auto slug from Title
  // let slug = values.title.replace(/\s+/g, "-").toLowerCase();

  formData.append("slug", values.url);
  if (image) {
    formData.append("image", image);
  }

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    // TODO ::: API CALL
    await axios.post(`${BASE_URL}/api/blogs`, formData, config);
    dispatch({
      type: CREATE_BLOG,
    });
    toast.success("Blog added successfully");
    dispatch(getBlogList());
    return true;
  } catch (err) {
    dispatch({
      type: CREATE_BLOG_ERROR,
    });
    console.log(err);
    return false;
  }
};

// UPDATE Blog
export const updateBlog = (values, image, id) => async (dispatch) => {
  const formData = new FormData();
  formData.append("title", values.title);
  formData.append("description", values.description);
  formData.append("featured", values.featured);

  // Auto slug from Title
  // let slug = values.title.replace(/\s+/g, "-").toLowerCase();

  formData.append("slug", values.url);
  if (image) {
    formData.append("image", image);
  }

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };
  try {
    // TODO ::: API CALL
    await axios.put(`${BASE_URL}/api/blogs/${id}`, formData, config);
    dispatch({
      type: UPDATE_BLOG,
    });
    toast.success("Blog updated successfully");
    dispatch(getBlogList());
    return true;
  } catch (err) {
    dispatch({
      type: UPDATE_BLOG_ERROR,
    });
    console.log(err);
    return false;
  }
};

//DELETE Blog
export const deleteBlog = (id) => async (dispatch) => {
  try {
    await axios.delete(`${BASE_URL}/api/blogs/${id}`);

    dispatch({
      type: DELETE_BLOG,
      payload: id,
    });
    return true;
  } catch (err) {
    dispatch({
      type: DELETE_BLOG_ERROR,
    });

    return false;
  }
};
