import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_CATEGORY,
  CREATE_CATEGORY_ERROR,
  GET_CATEGORY_LIST,
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
