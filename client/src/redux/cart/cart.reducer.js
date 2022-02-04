import { CartActionTypes } from './cart.types';
import { addItemToCart, removeItemFromCart} from './cart.utils';

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

        case CartActionTypes.CLEAR_ITEM_FROM_CART:
            return{
                ...state,
                cartItems:state.cartItems.filter((cartItem)=>{
                    return cartItem.id !== action.payload.id
                })
            }

        case CartActionTypes.REMOVE_ITEM:
            return{
                ...state,
                cartItems:removeItemFromCart(state.cartItems, action.payload)
            }

        case CartActionTypes.CLEAR_CART:
            return{
                ...state,
                cartItems:[]
            }
        
        //Don't forget to always return the sate by default
        default:
            return state;
    }
}

export default cartReducer;