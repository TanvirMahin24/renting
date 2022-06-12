import {
  CREATE_LISTING,
  DELETE_LISTING,
  GET_LISTING_DETAILS,
  GET_LISTING_LIST,
  GET_LISTING_SEARCH,
  GET_MY_LISTING_LIST,
} from "../constants/Type";

const inititalState = {
  listings: null,
  loading: false,
  selected_listing: null,
  search_listings: null,
  my_listings: null,
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
    case GET_MY_LISTING_LIST:
      return {
        ...state,
        my_listings: payload,
        loading: false,
      };
    case GET_LISTING_SEARCH:
      return {
        ...state,
        search_listings: payload,
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
        my_listings:
          state.my_listings === null ? null : [payload, ...state.my_listings],
        loading: false,
      };

    case DELETE_LISTING:
      return {
        ...state,
        my_listings: state.my_listings.filter(
          (listing) => listing.id !== parseInt(payload)
        ),
        listings: state.listings.filter(
          (listing) => listing.id !== parseInt(payload)
        ),
        loading: false,
      };
    default:
      return state;
  }
};

export default listingReducer;
