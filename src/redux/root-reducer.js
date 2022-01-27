import { combineReducers } from "redux";
import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";

//allow us to return a global state with all slices of state divided into multiple reducers
export default combineReducers({
    user:userReducer,
    cart: cartReducer
})