import { toast } from "react-toastify";
import axios from "axios";
import {
  AUTH_USER_LOAD,
  AUTH_USER_LOAD_ERROR,
  LOGIN_SUCCESS,
  LOGOUT_FAIL,
  LOGOUT_SUCCESS,
  PROFILE_UPDATE,
  PROFILE_UPDATE_ERROR,
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

    return true;
  } catch (error) {
    toast.error(error.response.data.message);
    return false;
  }
};

// REGISTER ACTION
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

    return true;
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
    });
    toast.error(error.response.data.message);
    return false;
  }
};

// LOGOUT ACTION
export const logoutAction = () => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };

    await axios.get(`${BASE_URL}/api/logout`, config);

    dispatch({
      type: LOGOUT_SUCCESS,
    });
    toast.success("Logout Successfully");
    return true;
  } catch (error) {
    dispatch({
      type: LOGOUT_FAIL,
    });
    toast.error(error.response.data.message);
    return false;
  }
};

// AUTH USER DATA ACTION
export const authUserAction = () => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };

    const res = await axios.get(`${BASE_URL}/api/user/auth`, config);

    dispatch({
      type: AUTH_USER_LOAD,
      payload: res.data.data,
    });
    return true;
  } catch (error) {
    dispatch({
      type: AUTH_USER_LOAD_ERROR,
    });
    return false;
  }
};

// UPDATE ACTION
export const updateUserAction = (values, id) => async (dispatch) => {
  try {
    const data = {
      first_name: values.fname,
      last_name: values.lname,
      phone: values.phone,
      email: values.email,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const res = await axios.patch(
      `${BASE_URL}/api/user/${id}`,
      JSON.stringify(data),
      config
    );

    dispatch({
      type: PROFILE_UPDATE,
      payload: res.data.data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: PROFILE_UPDATE_ERROR,
    });
    toast.error(error.response.data.message);
    return false;
  }
};
