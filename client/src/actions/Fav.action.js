import { toast } from "react-toastify";
import { ADD_TO_FAVORITE, REMOVE_FROM_FAVORITE } from "../constants/Type";

export const addToFavorite = (listingId) => (dispatch) => {
  if (localStorage.getItem("favorites-renting")) {
    let favorites = JSON.parse(localStorage.getItem("favorites-renting")).data;
    if (favorites.includes(listingId)) {
      return;
    } else {
      favorites.push(listingId);
    }
    localStorage.setItem(
      "favorites-renting",
      JSON.stringify({ data: favorites })
    );
  } else {
    localStorage.setItem(
      "favorites-renting",
      JSON.stringify({ data: [listingId] })
    );
  }

  toast.success("Added to favorite");

  dispatch({
    type: ADD_TO_FAVORITE,
    payload: listingId,
  });
};

export const removeFromFavorite = (listingId) => (dispatch) => {
  toast.error("Removed from favorite");
  dispatch({
    type: REMOVE_FROM_FAVORITE,
    payload: listingId,
  });
};
