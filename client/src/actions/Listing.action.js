import axios from "axios";
import { toast } from "react-toastify";
import {
  CREATE_LISTING,
  CREATE_LISTING_ERROR,
  DELETE_ADMIN,
  DELETE_ADMIN_ERROR,
  DELETE_LISTING,
  DELETE_LISTING_ERROR,
  GET_FAVORITE_LIST,
  GET_FILTER_LISTING,
  GET_LISTING_DETAILS,
  GET_LISTING_DETAILS_ERROR,
  GET_LISTING_LIST,
  GET_LISTING_SEARCH,
  GET_MY_LISTING_LIST,
  UPDATE_ADMIN,
  UPDATE_ADMIN_ERROR,
  UPDATE_LISTING,
  UPDATE_LISTING_ERROR,
  UPDATE_LISTING_STATUS,
  UPDATE_LISTING_STATUS_ERROR,
} from "../constants/Type";
import { BASE_URL } from "../constants/URL";

//GET FAV LISTING ACTION
export const getFavListings = (ids) => async (dispatch) => {
  try {
    const res = await axios.get(
      `${BASE_URL}/api/listing/fav?id=${ids.join(",")}`
    );

    dispatch({
      type: GET_FAVORITE_LIST,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

//GET LISTING ACTION
export const getListingLaningpage = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/listing?page=1&limit=9`);

    dispatch({
      type: GET_LISTING_LIST,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

//Change Status LISTING ACTION
export const statusChangeListing = (id, status) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    };

    const res = await axios.patch(
      `${BASE_URL}/api/listing/status/${id}`,
      JSON.stringify({ status }),
      config
    );

    dispatch({
      type: UPDATE_LISTING_STATUS,
      payload: res.data.data,
    });

    toast.success("Listing status updated successfully");

    return true;
  } catch (err) {
    dispatch({
      type: UPDATE_LISTING_STATUS_ERROR,
    });
    toast.error(err.response.data.message);
    return false;
  }
};

//GET LISTING ACTION
export const getMyListing = () => async (dispatch) => {
  try {
    const res = await axios.get(`${BASE_URL}/api/listing/my`, {
      withCredentials: true,
    });

    dispatch({
      type: GET_MY_LISTING_LIST,
      payload: res.data.data,
    });
  } catch (err) {
    console.log(err);
  }
};

//SEARCH LISTING ACTION
export const searchListingLanding = (text) => async (dispatch) => {
  if (text === "") {
    return null;
  }
  try {
    const res = await axios.get(
      `${BASE_URL}/api/listing/search?search=${text}`
    );

    dispatch({
      type: GET_LISTING_SEARCH,
      payload: res.data.data,
    });
    return res.data.data;
  } catch (err) {
    return null;
  }
};

//FILTER LISTING ACTION
export const filterListings =
  (start, end, category, district, division, sublet) => async (dispatch) => {
    try {
      const res = await axios.get(
        `${BASE_URL}/api/listing/filter?${
          category ? `category=${category}` : ""
        }&start=${start}&end=${end}${district ? `&district=${district}` : ""}${
          division ? `&division=${division}` : ""
        }&sublet=${sublet === true ? "1" : "0"}`
      );

      dispatch({
        type: GET_FILTER_LISTING,
        payload: res.data.data,
      });
      return res.data.data;
    } catch (err) {
      toast.error("Something went wrong");
      console.log(err);
      return null;
    }
  };

// LISTING DETAILS ACTION
export const getListingDetails = (slug) => async (dispatch) => {
  if (slug === "") {
    return null;
  }
  try {
    const res = await axios.get(`${BASE_URL}/api/listing/${slug}`);

    dispatch({
      type: GET_LISTING_DETAILS,
      payload: res.data.data,
    });
    return true;
  } catch (err) {
    dispatch({
      type: GET_LISTING_DETAILS_ERROR,
    });
    return false;
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

  data.append("bedrooms", values.bedrooms);

  data.append("bathrooms", values.bathrooms);

  data.append("dining", values.dining);

  data.append("kitchen", values.kitchen);

  data.append("drawingroom", values.drawingroom);

  // Requirements
  if (values.requirements) {
    values.requirements.map((item) => {
      data.append("requirements[]", item);
    });
  }
  // Keywords
  if (values.keywords) {
    values.keywords.map((item) => {
      data.append("keywords[]", item);
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

// Update Listing
export const updateListing =
  (values, images, preview, id) => async (dispatch) => {
    // Create Form data
    const data = new FormData();
    data.append("title", values.title);
    data.append("category", values.category);

    data.append("description", values.description);
    data.append("size", values.size);
    data.append("price", values.price);

    //Rooms
    data.append("sublet", values.sublet);

    data.append("bedrooms", values.bedrooms);

    data.append("bathrooms", values.bathrooms);

    data.append("dining", values.dining);

    data.append("kitchen", values.kitchen);

    data.append("drawingroom", values.drawingroom);

    // Requirements
    if (values.requirements) {
      values.requirements.map((item) => {
        data.append("requirements[]", item);
      });
    }
    // Keywords
    if (values.keywords) {
      values.keywords.map((item) => {
        data.append("keywords[]", item);
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
      const res = await axios.patch(
        `${BASE_URL}/api/listing/${id}`,
        data,
        config
      );
      dispatch({
        type: UPDATE_LISTING,
        payload: res.data.data,
      });
      return true;
    } catch (err) {
      toast.error(err.response.data.message);
      dispatch({
        type: UPDATE_LISTING_ERROR,
      });
      return false;
    }
  };

//DELETE Listing
export const deleteListing = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`${BASE_URL}/api/listing/${id}`, {
      withCredentials: true,
    });
    dispatch({
      type: DELETE_LISTING,
      payload: id,
    });
    toast.success("Listing deleted successfully");
    dispatch(getMyListing());
    return true;
  } catch (err) {
    console.log(err);
    dispatch({
      type: DELETE_LISTING_ERROR,
    });

    toast.error(err.response.data.message);

    return false;
  }
};
