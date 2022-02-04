import React from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

import { toggleCartHidden } from '../../redux/cart/cart.action';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import { CartIconContainer, CartShoppingIcon, CartItemCountSpan } from './Cart-icon.styles';

const CartIcon = () =>{

    const itemCount = useSelector(selectCartItemsCount);
    const dispatch = useDispatch();

    return (
        <CartIconContainer onClick={()=>dispatch(toggleCartHidden())}>
            <CartShoppingIcon/>
            <CartItemCountSpan>{itemCount}</CartItemCountSpan>
        </CartIconContainer>
    )
}



export default CartIcon;