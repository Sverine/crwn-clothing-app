import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';

import { toggleCartHidden } from '../../redux/cart/cart.action';
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg';
import { selectCartItemsCount } from '../../redux/cart/cart.selectors';

import './Cart-icon.styles.scss';

const CartIcon = ({toggleCartHidden, itemCount}) =>{
    return (
        <div className="cart-icon" onClick={toggleCartHidden}>
            <ShoppingIcon className='shopping-icon'/>
            <span className='item-count'>{itemCount}</span>
        </div>
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