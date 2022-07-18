const {
  GET_MY_REQUEST_LIST,
  GET_REQUEST_LIST,
  GET_REQUEST_DETAILS,
  GET_RECENT_REQUEST_LIST,
  GET_REPORT_LIST,
} = require("../constants/Type");

const initialState = {
  report: null,
};

const reportReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_REPORT_LIST:
      return {
        ...state,
        report: payload,
      };

    default:
      return state;
  }
};

export default reportReducer;
