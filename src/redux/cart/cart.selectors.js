import { createSelector } from "reselect";

const selectCart = (state) => state.cart

//This method need two arguments : the actual state and a function that will map into all items
export const selectCartItems = createSelector(
    [selectCart],
    (cart)=> cart.cartItems
)

export const selectCartItemsCount =  createSelector(
    [selectCartItems],
    (cartItems) => 
        cartItems.reduce((accumulatedQuantity, CartItem)=>{
            return accumulatedQuantity + CartItem.quantity},0)
        
)