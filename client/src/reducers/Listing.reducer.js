import {
  CREATE_LISTING,
  GET_LISTING_DETAILS,
  GET_LISTING_LIST,
} from "../constants/Type";

const inititalState = {
  listings: null,
  loading: false,
  selected_listing: null,
};

const listingReducer = (state = inititalState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_LISTING_LIST:
      return {
        ...state,
        listings: payload,
        loading: false,
      };
    case GET_LISTING_DETAILS:
      return {
        ...state,
        selected_listing: payload,
        loading: false,
      };

    case CREATE_LISTING:
      return {
        ...state,
        listings: state.listings === null ? null : [payload, ...state.listings],
        loading: false,
      };
    default:
      return state;
  }
};

export default listingReducer;
