import React from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { createStructuredSelector } from 'reselect';

import CustomButton from "../custom-button/Custom-button.component";
import CartItem from "../cart-item/Cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selectors";
import { toggleCartHidden } from "../../redux/cart/cart.action";

import './Cart-dropdown.styles.scss';

//dispatch is already imported when we use connect method and history with withRouter method
const CartDropdown = ({cartItems, history, dispatch}) =>{
    return(
        <div className="cart-dropdown">
            <div className="cart-items">
                {
                    cartItems.length ?
                    cartItems.map((cartItem)=>{
                        return <CartItem key={cartItem.id} item={cartItem}/>
                    })
                    : <span className="empty-message">Your cat is empty</span>
                }
            </div>
            <CustomButton onClick={()=>{
                history.push('/checkout');
                dispatch(toggleCartHidden())
                }}>GO TO CHECKOUT</CustomButton>
        </div>
    )
}


const mapStateToProps = createStructuredSelector (
    {cartItems:selectCartItems}
)

export default withRouter(connect(mapStateToProps) (CartDropdown));

