import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';

import CustomButton from "../custom-button/Custom-button.component";
import CartItem from "../cart-item/Cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.action";

import { CartDropdownContainer, CartDropdownItems, EmptyMessageSpan, ButtonContainer } from "./Cart-dropdown.styles";

//dispatch is already imported when we use connect method and history with withRouter method
const CartDropdown = ({cartItems, history, dispatch}) =>{
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


const mapStateToProps = createStructuredSelector (
    {cartItems:selectCartItems}
)

export default withRouter(connect(mapStateToProps) (CartDropdown));

