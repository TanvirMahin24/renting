import { combineReducers } from "redux";
import authReducer from "./Auth.reducer";
import BlogReducer from "./Blog.reducer";

const reducer = combineReducers({
  auth: authReducer,
  blog: BlogReducer,
});

export default reducer;
