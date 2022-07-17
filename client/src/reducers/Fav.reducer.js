import {
  ADD_TO_FAVORITE,
  GET_FAVORITE_LIST,
  REMOVE_FROM_FAVORITE,
} from "../constants/Type";

const initialValues = {
  favorite: localStorage.getItem("favorites-renting")
    ? JSON.parse(localStorage.getItem("favorites-renting")).data
    : [],
  data: null,
};

const FavReducer = (state = initialValues, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_TO_FAVORITE:
      return {
        ...state,
        favorite: [...state.favorite, payload],
      };
    case REMOVE_FROM_FAVORITE:
      let favorites = state.favorite.filter((item) => item !== payload);
      localStorage.setItem(
        "favorites-renting",
        JSON.stringify({ data: favorites })
      );
      return {
        ...state,
        favorite: favorites,
      };
    case GET_FAVORITE_LIST:
      return {
        ...state,
        data: payload,
      };
    default:
      return state;
  }
};

export default FavReducer;
