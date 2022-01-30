import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { toggleCartHidden } from '../../redux/cart/cart.action';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import { CartIconContainer, CartShoppingIcon, CartItemCountSpan } from './Cart-icon.styles';

const CartIcon = ({toggleCartHidden, itemCount}) =>{
    return (
        <CartIconContainer onClick={toggleCartHidden}>
            <CartShoppingIcon/>
            <CartItemCountSpan>{itemCount}</CartItemCountSpan>
        </CartIconContainer>
    )
}

const mapDispatchToProps = (dispatch) =>({
    //user can be name as well as we want
    toggleCartHidden: () => dispatch(toggleCartHidden())
  }) 


const mapStateToProps = createStructuredSelector({
    itemCount : selectCartItemsCount
})

export default connect(mapStateToProps, mapDispatchToProps)(CartIcon);