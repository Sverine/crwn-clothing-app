import React from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import CartItem from "../cart-item/Cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.action";

import { CartDropdownContainer, CartDropdownItems, EmptyMessageSpan, ButtonContainer } from "./Cart-dropdown.styles";

//dispatch is already imported when we use connect method and history with withRouter method
const CartDropdown = () =>{
    const cartItems = useSelector(selectCartItems);
    const dispatch = useDispatch();
    const history = useHistory();

    return(
        <CartDropdownContainer>
            <CartDropdownItems>
                {
                    cartItems.length ?
                    cartItems.map((cartItem)=>{
                        return <CartItem key={cartItem.id} item={cartItem}/>
                    })
                    : <EmptyMessageSpan >Your cat is empty</EmptyMessageSpan>
                }
            </CartDropdownItems>
            <ButtonContainer onClick={()=>{
                history.push('/checkout');
                dispatch(toggleCartHidden())
                }}>GO TO CHECKOUT</ButtonContainer>
        </CartDropdownContainer>
    )
}


export default CartDropdown;

