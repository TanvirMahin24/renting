import { combineReducers } from "redux";
import authReducer from "./Auth.reducer";
import CategoryReducer from "./Category.reducer";
import FavReducer from "./Fav.reducer";
import listingReducer from "./Listing.reducer";
import requestReducer from "./Request.reducer";
import UsersReducer from "./Users.reducer";

const reducer = combineReducers({
  auth: authReducer,
  category: CategoryReducer,
  users: UsersReducer,
  listing: listingReducer,
  request: requestReducer,
  fav: FavReducer,
});

export default reducer;
