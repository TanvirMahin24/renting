import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_CATEGORY,
  CREATE_CATEGORY_ERROR,
  DELETE_CATEGORY,
  DELETE_CATEGORY_ERROR,
  GET_CATEGORY_LIST,
  UPDATE_CATEGORY,
  UPDATE_CATEGORY_ERROR,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";

// GET CATEGORY ACTION
export const getCategoryAction = () => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };

    const res = await axios.get(`${BASE_URL}/api/category`, config);

    dispatch({
      type: GET_CATEGORY_LIST,
      payload: res.data.data,
    });

    return true;
  } catch (error) {
    toast.error(error.response.data.message);
    return false;
  }
};

// CREATE CATEGORY ACTION
export const createCategoryAction = (values) => async (dispatch) => {
  try {
    const data = {
      name: values.name,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const res = await axios.post(
      `${BASE_URL}/api/category`,
      JSON.stringify(data),
      config
    );

    dispatch({
      type: CREATE_CATEGORY,
      payload: res.data.data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: CREATE_CATEGORY_ERROR,
    });
    toast.error(error.response.data.message);
    return false;
  }
};

// DELETE CATEGORY ACTION
export const deleteCategoryAction = (id) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };

    const res = await axios.delete(`${BASE_URL}/api/category/${id}`, config);

    toast.success("Category Deleted Successfully");
    dispatch({
      type: DELETE_CATEGORY,
      payload: id,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DELETE_CATEGORY_ERROR,
    });
    toast.error(error.response.data.message);
    return false;
  }
};

// UPDATE CATEGORY ACTION
export const updateCategoryAction = (values, id) => async (dispatch) => {
  try {
    const data = {
      name: values.name,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const res = await axios.patch(
      `${BASE_URL}/api/category/${id}`,
      JSON.stringify(data),
      config
    );

    dispatch({
      type: UPDATE_CATEGORY,
      payload: res.data.data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: UPDATE_CATEGORY_ERROR,
    });
    toast.error(error.response.data.message);
    return false;
  }
};
