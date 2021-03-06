import React from "react";

import './Checkout.styles.scss';

import { selectCartItems, selectCartTotal } from '../../redux/cart/cart.selectors'
import CheckoutItem from "../../components/checkout-item/Checkout-item.component";
import StripeCheckoutButton from "../../components/stripe-button/Stripe-button.component";
import { useSelector } from "react-redux";


const CheckoutPage = ()=>{

    const cartItems = useSelector(selectCartItems);
    const total = useSelector(selectCartTotal);
    

    return (
        <div className="checkout-page">
            <div className="checkout-header">
                <div className="header-block">
                    <span>Product</span>
                </div>
                <div className="header-block">
                    <span>Description</span>
                </div>
                <div className="header-block">
                    <span>Quantity</span>
                </div>
                <div className="header-block">
                    <span>Price</span>
                </div>
                <div className="header-block">
                    <span>Remove</span>
                </div>
            </div>
            {
                cartItems.map((cartItem=>{
                    return <CheckoutItem key={cartItem.id} cartItem={cartItem} />
                }))
            }
            <div className="total">
                <span>TOTAL : ${total} </span>
            </div>
            <div className="test-warning">
                *please use the following test credid card for payments*<br/>
                4242 4242 4242 4242 - Exp : 01/2022 CVV:123
            </div>
            <StripeCheckoutButton price={total}/>
        </div>
    )
}


export default CheckoutPage; 