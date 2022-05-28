import { CREATE_CATEGORY, GET_CATEGORY_LIST } from "../constants/Type";

const initialState = {
  categories: null,
  loading: false,
};

const CategoryReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_CATEGORY_LIST:
      return {
        ...state,
        categories: payload,
        loading: false,
      };
    case CREATE_CATEGORY:
      return {
        ...state,
        categories: [...state.categories, payload],
        loading: false,
      };
    default:
      return state;
  }
};

export default CategoryReducer;
