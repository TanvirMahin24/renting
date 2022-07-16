const {
  GET_MY_REQUEST_LIST,
  GET_REQUEST_LIST,
  GET_REQUEST_DETAILS,
  GET_RECENT_REQUEST_LIST,
} = require("../constants/Type");

const initialState = {
  requests_list: null,
  my_requests_list: null,
  request: null,
  recent: null,
};

const requestReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_RECENT_REQUEST_LIST:
      return {
        ...state,
        recent: payload,
      };
    case GET_MY_REQUEST_LIST:
      return {
        ...state,
        my_requests_list: payload,
      };
    case GET_REQUEST_LIST:
      return {
        ...state,
        requests_list: payload,
      };
    case GET_REQUEST_DETAILS:
      return {
        ...state,
        request: payload,
      };
    default:
      return state;
  }
};

export default requestReducer;
