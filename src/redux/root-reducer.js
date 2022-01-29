import { combineReducers } from "redux";
import { persistReducer } from 'redux-persist';

//defined as the localStorage
import storage from 'redux-persist/lib/storage';

import userReducer from "./user/user.reducer";
import cartReducer from "./cart/cart.reducer";
import directoryReducer from "./directory/directory.reducer";
import shopReducer  from "./shop/shop.reducer"

const persistConfig={
    key:'root',
    storage,
    //any reducer we want to store
    whitelist:['cart']
}

//allow us to return a global state with all slices of state divided into multiple reducers
const rootReducer = combineReducers({
    user:userReducer,
    cart: cartReducer,
    directory:directoryReducer,
    shop:shopReducer
})

export default persistReducer(persistConfig,rootReducer);