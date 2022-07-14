import { CREATE_SUBSCRIBER, GET_SUBSCRIBER_LIST } from "../constants/Type";
import { toast } from "react-toastify";
import axios from "axios";
import { BASE_URL } from "../constants/URL";

export const addSubscriber = (phone) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    await axios.post("/api/subscriber", JSON.stringify({ phone }), config);
    dispatch({
      type: CREATE_SUBSCRIBER,
    });

    toast.success("Subscribed to Newsletter Successfully");
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

// GET SUBSCRIBER ACTION
export const getSubsAction = () => async (dispatch) => {
  try {
    const config = {
      withCredentials: true,
    };

    const res = await axios.get(`${BASE_URL}/api/subscriber`, config);

    dispatch({
      type: GET_SUBSCRIBER_LIST,
      payload: res.data.data,
    });

    return true;
  } catch (error) {
    toast.error(error.response.data.message);
    return false;
  }
};
