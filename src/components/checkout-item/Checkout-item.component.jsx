import React from "react";
import { connect } from "react-redux";


import { CheckoutItemContainer, CheckoutImgContainer, TextContainer, QuantityContainer, RemoveButtonContainer } from "./Checkout-item.styles";

import { clearItemFromCart, addItem, removeItem } from "../../redux/cart/cart.action";

const CheckoutItem = ({cartItem, clearItem, addItem, removeItem}) =>{
    const {name, imageUrl, price, quantity} = cartItem
    return(
        <CheckoutItemContainer>
            <CheckoutImgContainer>
                <img src={imageUrl} alt="item" />
            </CheckoutImgContainer>
            <TextContainer>{name}</TextContainer>
            <QuantityContainer>
                <div className="arrow"onClick={()=>removeItem(cartItem)}>&#10094;</div>
                    <span className="value">{quantity}</span>
                <div className="arrow" onClick={()=>addItem(cartItem)}>&#10095;</div>
            </QuantityContainer>
            <TextContainer >{price}</TextContainer>
            <RemoveButtonContainer onClick={()=>clearItem(cartItem)}>&#10005;</RemoveButtonContainer>
        </CheckoutItemContainer>
    )
}

const mapDispatchToProps = dispatch=>(
    {
        clearItem: item=>dispatch(clearItemFromCart(item)),
        addItem : item =>dispatch(addItem(item)),
        removeItem: item=>dispatch(removeItem(item))
    }
)

export default connect(null, mapDispatchToProps)(CheckoutItem);