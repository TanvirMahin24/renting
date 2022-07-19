import {
  CREATE_REPORT,
  CREATE_REPORT_ERROR,
  GET_REPORT_LIST,
  REQUEST_STATUS_CHANGE,
  DELETE_REPORT,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";
import axios from "axios";
import { toast } from "react-toastify";

// Create Request
export const createReportAction = (values, id) => async (dispatch) => {
  try {
    const data = {
      message: values.message,
    };

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    await axios.post(
      `${BASE_URL}/api/report/${id}`,
      JSON.stringify(data),
      config
    );
    dispatch({
      type: CREATE_REPORT,
    });

    return true;
  } catch (error) {
    toast.error(error.message);
    dispatch({
      type: CREATE_REPORT_ERROR,
    });
  }
};

// get my requests
export const getReportsAction = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/report`, {
      withCredentials: true,
    });
    dispatch({
      type: GET_REPORT_LIST,
      payload: res.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// get report details action
export const deleteReportAction = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/report/${id}`, {
      withCredentials: true,
    });
    dispatch({
      type: DELETE_REPORT,
      payload: id,
    });
    toast.success(res.data.message);
  } catch (error) {
    console.log(error);
  }
};

// change status action
export const changeStatusAction = (id, status) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    await axios.patch(
      `${BASE_URL}/api/request/${id}`,
      JSON.stringify({ status }),
      config
    );

    dispatch({
      type: REQUEST_STATUS_CHANGE,
    });

    toast.success("Status changed successfully");
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
