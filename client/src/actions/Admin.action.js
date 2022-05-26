import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_ADMIN,
  CREATE_ADMIN_ERROR,
  DELETE_ADMIN,
  DELETE_ADMIN_ERROR,
  GET_ADMIN_LIST,
  UPDATE_ADMIN,
  UPDATE_ADMIN_ERROR,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";
import setAuthToken from "../utils/setAuthToken";

//GET ADMIN LIST
export const getAdminList = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/admin`);
    // console.log(res);

    dispatch({
      type: GET_ADMIN_LIST,
      payload: res.data,
    });
  } catch (err) {
    console.log(err);
  }
};

// CREATE Admin
export const createAdmin = (values) => async (dispatch) => {
  let formData = {
    username: values.name,
    password: values.password,
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    // TODO ::: API CALL
    await axios.post(`${BASE_URL}/api/admin`, JSON.stringify(formData), config);
    dispatch({
      type: CREATE_ADMIN,
    });
    toast.success("Admin added successfully");
    dispatch(getAdminList());
    return true;
  } catch (err) {
    dispatch({
      type: CREATE_ADMIN_ERROR,
    });
    console.log(err);
    return false;
  }
};

// UPDATE Admin
export const updateAdmin = (values, gameId, id) => async (dispatch) => {
  let formData = {
    name: values.name,
    gameId: gameId,
    customGameId: values.customGameId,
    pictureUrl: values.pictureUrl,
    addtionalInfo: {
      test: "test data",
    },
  };

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    // TODO ::: API CALL
    const res = await axios.put(
      `${BASE_URL}/api/playerUpdate/${id}`,
      JSON.stringify(formData),
      config
    );
    if (res.data.code === 200) {
      dispatch({
        type: UPDATE_ADMIN,
      });
      toast.success("Player updated successfully");
      dispatch(getAdminList());
      return true;
    } else {
      toast.error(res.data.message);
    }
    return false;
  } catch (err) {
    dispatch({
      type: UPDATE_ADMIN_ERROR,
    });
    console.log(err);
    return false;
  }
};

//DELETE Admin
export const deleteAdmin = (playerUniqueId) => async (dispatch) => {
  try {
    if (localStorage.getItem("token_anbs")) {
      setAuthToken(localStorage.getItem("token_anbs"));
    }
    const res = await axios.delete(
      `${BASE_URL}/api/deletePlayer?playerUniqueId=${playerUniqueId}`
    );
    if (res.data.code === 200) {
      dispatch({
        type: DELETE_ADMIN,
        payload: playerUniqueId,
      });
      return true;
    } else {
      return false;
    }
  } catch (err) {
    dispatch({
      type: DELETE_ADMIN_ERROR,
    });

    return false;
  }
};
