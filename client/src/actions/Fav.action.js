import { ADD_TO_FAVORITE, REMOVE_FROM_FAVORITE } from "../constants/Type";

export const addToFavorite = (listingId) => (dispatch) => {
  if (localStorage.getItem("favorites")) {
    let favorites = JSON.parse(localStorage.getItem("favorites")).data;
    if (favorites.includes(listingId)) {
      return;
    } else {
      favorites.push(listingId);
    }
    localStorage.setItem("favorites", JSON.stringify({ data: favorites }));
  } else {
    localStorage.setItem("favorites", JSON.stringify({ data: [listingId] }));
  }

  dispatch({
    type: ADD_TO_FAVORITE,
    payload: listingId,
  });
};

export const removeFromFavorite = (listingId) => (dispatch) => {
  dispatch({
    type: REMOVE_FROM_FAVORITE,
    payload: listingId,
  });
};
