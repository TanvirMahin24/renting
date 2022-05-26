import { toast } from "react-toastify";
import axios from "axios";
import { LOGIN_SUCCESS } from "../constants/Type";
import { BASE_URL } from "../constants/URL";

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
