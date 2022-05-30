import {
  CREATE_CATEGORY,
  DELETE_CATEGORY,
  GET_CATEGORY_LIST,
  UPDATE_CATEGORY,
} from "../constants/Type";

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
    case DELETE_CATEGORY:
      return {
        ...state,
        categories: state.categories.filter(
          (category) => category.id !== payload
        ),
        loading: false,
      };
    case UPDATE_CATEGORY:
      return {
        ...state,
        categories: state.categories.map((category) =>
          category.id === payload.id ? payload : category
        ),
        loading: false,
      };

    default:
      return state;
  }
};

export default CategoryReducer;
