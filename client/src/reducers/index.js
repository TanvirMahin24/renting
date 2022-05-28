import { combineReducers } from "redux";
import authReducer from "./Auth.reducer";
import BlogReducer from "./Blog.reducer";
import CategoryReducer from "./Category.reducer";

const reducer = combineReducers({
  auth: authReducer,
  blog: BlogReducer,
  category: CategoryReducer,
});

export default reducer;
