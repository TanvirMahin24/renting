import { CREATE_SUBSCRIBER } from "../constants/Type";
import { toast } from "react-toastify";
import axios from "axios";

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
