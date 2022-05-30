import {
  CREATE_USERS,
  DELETE_USERS,
  GET_USERS_LIST,
  UPDATE_USERS,
} from "../constants/Type";

const initialState = {
  users: null,
  loading: false,
};

const UsersReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_USERS_LIST:
      return {
        ...state,
        users: payload,
        loading: false,
      };
    case CREATE_USERS:
      return {
        ...state,
        users: [...state.users, payload],
        loading: false,
      };
    case DELETE_USERS:
      return {
        ...state,
        users: state.users.filter((usr) => usr.id !== payload),
        loading: false,
      };
    case UPDATE_USERS:
      return {
        ...state,
        users: state.users.map((usr) =>
          usr.id === payload.id ? payload : usr
        ),
        loading: false,
      };

    default:
      return state;
  }
};

export default UsersReducer;
