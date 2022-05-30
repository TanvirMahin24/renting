import { combineReducers } from "redux";
import authReducer from "./Auth.reducer";
import CategoryReducer from "./Category.reducer";
import UsersReducer from "./Users.reducer";

const reducer = combineReducers({
  auth: authReducer,
  category: CategoryReducer,
  users: UsersReducer,
});

export default reducer;
