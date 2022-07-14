import axios from "axios";
import { toast } from "react-toastify";
import {
  CONTACT_SUBMIT,
  CONTACT_SUBMIT_ERROR,
  GET_CONTACT_LIST,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";

export const submitContact = (values) => async (dispatch) => {
  try {
    const data = {
      name: values.name,
      email: values.email,
      message: values.message,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    await axios.post(`${BASE_URL}/api/contact`, JSON.stringify(data), config);

    dispatch({
      type: CONTACT_SUBMIT,
    });

    return true;
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
    dispatch({
      type: CONTACT_SUBMIT_ERROR,
    });
    return false;
  }
};

// GET Contact ACTION
export const getContactsAction = () => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };

    const res = await axios.get(`${BASE_URL}/api/contact`, config);

    dispatch({
      type: GET_CONTACT_LIST,
      payload: res.data.data,
    });

    return true;
  } catch (error) {
    toast.error(error.response.data.message);
    return false;
  }
};
