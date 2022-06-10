import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_ADMIN,
  CREATE_ADMIN_ERROR,
  CREATE_LISTING,
  CREATE_LISTING_ERROR,
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

// CREATE Listing
export const createListing = (values, images, preview) => async (dispatch) => {
  // Create Form data
  const data = new FormData();
  data.append("title", values.title);
  data.append("category", values.category);

  data.append("description", values.description);
  data.append("size", values.size);
  data.append("price", values.price);

  //Rooms
  data.append("sublet", values.sublet);
  if (values.bedrooms) {
    data.append("bedrooms", values.bedrooms);
  }
  if (values.bathrooms) {
    data.append("bathrooms", values.bathrooms);
  }
  if (values.dining) {
    data.append("dining", values.dining);
  }
  if (values.kitchen) {
    data.append("kitchen", values.kitchen);
  }
  if (values.drawingroom) {
    data.append("drawingroom", values.drawingroom);
  }

  // Requirements
  if (values.requirements) {
    values.requirements.map((item) => {
      data.append("requirements", item);
    });
  }
  // Keywords
  if (values.keywords) {
    values.keywords.map((item) => {
      data.append("keywords", item);
    });
  }

  // Images
  if (images) {
    for (let i = 0; i < images.length; i++) {
      data.append("image", images[i]);
    }
  }

  if (preview) {
    data.append("preview_image", preview);
  }

  //Address
  data.append("full_address", values.full_address);
  data.append("district", values.district);
  data.append("house_no", values.house_no);
  data.append("floor_no", values.floor_no);
  data.append("flat_no", values.flat_no);

  const config = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    withCredentials: true,
  };
  try {
    // TODO ::: API CALL
    const res = await axios.post(`${BASE_URL}/api/listing`, data, config);
    dispatch({
      type: CREATE_LISTING,
      payload: res.data.data,
    });
    return true;
  } catch (err) {
    toast.error(err.response.data.message);
    dispatch({
      type: CREATE_LISTING_ERROR,
    });
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
