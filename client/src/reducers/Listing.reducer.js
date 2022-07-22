import {
  CREATE_LISTING,
  DELETE_LISTING,
  GET_FILTER_LISTING,
  GET_LISTING_DETAILS,
  GET_LISTING_LIST,
  GET_LISTING_SEARCH,
  GET_MY_LISTING_LIST,
  UPDATE_LISTING_STATUS,
} from "../constants/Type";

const inititalState = {
  listings: null,
  loading: false,
  selected_listing: null,
  search_listings: null,
  filter_listings: null,
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

    case UPDATE_LISTING_STATUS:
      return {
        ...state,
        listings: state.listings.map((listing) => {
          if (listing.id === payload.id) {
            return payload;
          }
          return listing;
        }),
        loading: false,
      };
    case GET_FILTER_LISTING:
      return {
        ...state,
        filter_listings: payload,
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
          state.my_listings === null
            ? null
            : {
                ...state.my_listings,
                rows: [payload, ...state.my_listings.rows],
              },
        loading: false,
      };

    case DELETE_LISTING:
      return {
        ...state,

        loading: false,
      };
    default:
      return state;
  }
};

export default listingReducer;
