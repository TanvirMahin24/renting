const { GET_REPORT_LIST, DELETE_REPORT } = require("../constants/Type");

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
    case DELETE_REPORT:
      return {
        ...state,
        report: state.report.filter((report) => report.id !== payload),
      };
    default:
      return state;
  }
};

export default reportReducer;
