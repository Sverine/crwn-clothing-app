import React from "react";

import { CartItemContainer, ImgContainer, ItemDetailsContainer, NameSpan } from "./Cart-item.styles";

const CartItem = ({item})=>{
    //To avoid use this, you also can make a deconstruction into the deconstruction passed as props by wiriting:
    //const CartItem = ({item: { imageUrl, price, name, quantity }})
    const {imageUrl, price, name, quantity} = item;
    return(
        <CartItemContainer>
            <ImgContainer src={imageUrl} alt="item" />
            <ItemDetailsContainer>
                <span>{name}</span>
                <span>{quantity} x ${price}</span>
            </ItemDetailsContainer>
        </CartItemContainer>
    )
}

export default CartItem;