import {
  CREATE_REQUEST,
  CREATE_REQUEST_ERROR,
  GET_MY_REQUEST_LIST,
  GET_RECENT_REQUEST_LIST,
  GET_REQUEST_DETAILS,
  GET_REQUEST_LIST,
  REQUEST_STATUS_CHANGE,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";
import axios from "axios";
import { toast } from "react-toastify";

// Create Request
export const createReqAction = (values, id, doc) => async (dispatch) => {
  try {
    const formData = new FormData();
    formData.append("phone", values.phone);
    formData.append("name", values.name);
    formData.append("occupation", values.occupation);
    if (values.job_title) {
      formData.append("job_title", values.job_title);
    }
    if (doc) {
      formData.append("document", doc);
    }

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      withCredentials: true,
    };

    const res = await axios.post(
      `${BASE_URL}/api/request/${id}`,
      formData,
      config
    );
    dispatch({
      type: CREATE_REQUEST,
    });

    return true;
  } catch (error) {
    toast.error(error.response.data.message);
    dispatch({
      type: CREATE_REQUEST_ERROR,
    });
  }
};

// get my requests
export const getMyReqAction = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/request/my`, {
      withCredentials: true,
    });
    dispatch({
      type: GET_MY_REQUEST_LIST,
      payload: res.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// get recent requests
export const getRecentReqAction = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/request/recent`, {
      withCredentials: true,
    });
    console.log(res.data);
    dispatch({
      type: GET_RECENT_REQUEST_LIST,
      payload: res.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// get modarator requests
export const getModaratorReqAction = (status) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/request/mod/${!status ? "pending" : status}`,
      {
        withCredentials: true,
      }
    );
    dispatch({
      type: GET_REQUEST_LIST,
      payload: res.data.data,
    });
  } catch (error) {
    console.log(error);
  }
};

// get request details action
export const getRequestDetailsAction = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/request/${id}`, {
      withCredentials: true,
    });
    dispatch({
      type: GET_REQUEST_DETAILS,
      payload: res.data.data,
    });
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

    const res = await axios.patch(
      `${BASE_URL}/api/request/${id}`,
      JSON.stringify({ status }),
      config
    );

    dispatch({
      type: REQUEST_STATUS_CHANGE,
    });
    dispatch(getRequestDetailsAction(id));

    toast.success("Status changed successfully");
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
