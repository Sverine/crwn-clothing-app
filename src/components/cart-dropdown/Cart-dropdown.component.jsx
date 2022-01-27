import React from "react";
import { connect } from "react-redux";
import CustomButton from "../custom-button/Custom-button.component";
import CartItem from "../cart-item/Cart-item.component";

import './Cart-dropdown.styles.scss';

const CartDropdown = ({cartItems}) =>{
    return(
        <div className="cart-dropdown">
            <div className="cart-items">
                {
                    cartItems.map((cartItem)=>{
                        return <CartItem key={cartItem.id} item={cartItem}/>
                    })
                }
            </div>
            <CustomButton>GO TO CHECKOUT</CustomButton>
        </div>
    )
}

const mapStateToProps = (state) =>({
    cartItems : state.cart.cartItems
})

export default connect(mapStateToProps) (CartDropdown);

