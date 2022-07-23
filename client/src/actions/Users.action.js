import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_USERS,
  CREATE_USERS_ERROR,
  DELETE_USERS,
  DELETE_USERS_ERROR,
  GET_USERS_LIST,
  PASSWORD_CHANGED,
  PASSWORD_CHANGED_ERROR,
  RESET_LINK_SENT,
  UPDATE_USERS,
  UPDATE_USERS_ERROR,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";

// GET USERS ACTION
export const getUsersAction = () => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };

    const res = await axios.get(`${BASE_URL}/api/user`, config);

    dispatch({
      type: GET_USERS_LIST,
      payload: res.data.data,
    });

    return true;
  } catch (error) {
    toast.error(error.response.data.message);
    return false;
  }
};

// GET USERS ACTION
export const resetLinkSend = (email) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    await axios.post(
      `${BASE_URL}/api/user/reset`,
      JSON.stringify({ email }),
      config
    );

    dispatch({
      type: RESET_LINK_SENT,
    });

    return true;
  } catch (error) {
    toast.error(error.response.data.message);
    return false;
  }
};

// CREATE USER ACTION
export const createUsersAction = (values) => async (dispatch) => {
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
      `${BASE_URL}/api/user`,
      JSON.stringify(data),
      config
    );

    dispatch({
      type: CREATE_USERS,
      payload: res.data.data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: CREATE_USERS_ERROR,
    });
    toast.error(error.response.data.message);
    return false;
  }
};

// DELETE USERS ACTION
export const deleteUsersAction = (id) => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };

    await axios.delete(`${BASE_URL}/api/user/${id}`, config);

    toast.success("User Deleted Successfully");
    dispatch({
      type: DELETE_USERS,
      payload: id,
    });

    return true;
  } catch (error) {
    dispatch({
      type: DELETE_USERS_ERROR,
    });
    toast.error(error.response.data.message);
    return false;
  }
};

// UPDATE USER ACTION
export const updateUsersAction = (values, id) => async (dispatch) => {
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
      `${BASE_URL}/api/user/${id}`,
      JSON.stringify(data),
      config
    );

    dispatch({
      type: UPDATE_USERS,
      payload: res.data.data,
    });

    return true;
  } catch (error) {
    dispatch({
      type: UPDATE_USERS_ERROR,
    });
    toast.error(error.response.data.message);
    return false;
  }
};
// UPDATE USER ACTION
export const updatePasswordAction = (values, id) => async (dispatch) => {
  try {
    const data = {
      password: values.password,
      newPassword: values.newPassword,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    await axios.patch(
      `${BASE_URL}/api/user/password`,
      JSON.stringify(data),
      config
    );

    dispatch({
      type: PASSWORD_CHANGED,
    });

    toast.success("Password Changed Successfully");

    return true;
  } catch (error) {
    dispatch({
      type: PASSWORD_CHANGED_ERROR,
    });
    toast.error(error.response.data.message);
    return false;
  }
};
