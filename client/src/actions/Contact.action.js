import axios from "axios";
import { toast } from "react-toastify";
import { CONTACT_SUBMIT, CONTACT_SUBMIT_ERROR } from "../constants/Type";
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
