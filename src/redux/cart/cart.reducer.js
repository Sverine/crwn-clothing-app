import { CartActionTypes } from './cart.types';
import { addItemToCart } from './cart.utils';

const INITIAL_STATE = {
    hidden:true,
    cartItems: []
}

const cartReducer = (state=INITIAL_STATE, action) => {
    switch(action.type){
        case CartActionTypes.TOGGLE_CART_HIDDEN:
            return{
                ...state,
                hidden:!state.hidden
            }

        case CartActionTypes.ADD_ITEM:
            return{
                ...state,
                cartItems: addItemToCart(state.cartItems, action.payload)
                //cartItems : [...state.cartItems, action.payload]
                //This way to do with the spread and the array method is used to increment the array by keeping the rest already inside
            }
        
        //Don't forget to always return the sate by default
        default:
            return state;
    }
}

export default cartReducer;