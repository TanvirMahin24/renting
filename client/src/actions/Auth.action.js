import { toast } from "react-toastify";
import axios from "axios";
import {
  LOGIN_SUCCESS,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";

// LOGIN ACTION
export const loginAction = (values) => async (dispatch) => {
  try {
    const data = {
      email: values.email,
      password: values.password,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const res = await axios.post(
      `${BASE_URL}/api/login`,
      JSON.stringify(data),
      config
    );

    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

// LOGIN ACTION
export const registerAction = (values) => async (dispatch) => {
  try {
    const data = {
      first_name: values.fname,
      last_name: values.lname,
      phone: values.phone,
      email: values.email,
      password: values.password,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const res = await axios.post(
      `${BASE_URL}/api/register`,
      JSON.stringify(data),
      config
    );

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
    });
    toast.error(error.response.data.message);
  }
};
