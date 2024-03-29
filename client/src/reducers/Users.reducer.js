import {
  ADMIN_DATA_LOAD,
  DELETE_USERS,
  GET_CONTACT_LIST,
  GET_SUBSCRIBER_LIST,
  GET_USERS_LIST,
  UPDATE_USERS,
} from "../constants/Type";

const initialState = {
  users: null,
  mod: null,
  dashboard: null,
  contact: null,
  subscriber: null,
  loading: false,
};

const UsersReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_SUBSCRIBER_LIST:
      return {
        ...state,
        subscriber: payload,
        loading: false,
      };
    case GET_CONTACT_LIST:
      return {
        ...state,
        contact: payload,
      };
    case ADMIN_DATA_LOAD:
      return {
        ...state,
        dashboard: payload,
        loading: false,
      };
    case GET_USERS_LIST:
      return {
        ...state,
        users: payload,
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
