import React from "react";
import StripeCheckout from 'react-stripe-checkout';

const StripeCheckoutButton = ({price})=>{
    //Stripe needs a price in cents, so we need to make the conversion
    const priceForStripe = price * 100;
    const publisahbleKey = 'pk_test_51KNM8ILJFn0Pxs8VxB26T4CwhIxuyQ1cFvnrXJpLU1xjn5X4hJHfEGWTHs4eHrqMGWmHkCU8yptfeFPOwdHLN4PJ00aYrvwqZ9'
    const onToken = (token) =>{
        console.log(token);
        alert('Payment successfull')
    }

    return(
        <StripeCheckout
            label="Pay now"
            name="CRWN Clothing Ltd."
            billingAddress
            shippingAddress
            image='https://svgshare.com/i/CUz.svg'
            description={`Your total is ${price}`}
            amount={priceForStripe}
            panelLabel='Pay now'
            token={onToken}
            stripeKey={publisahbleKey}
        />
    )
}

export default StripeCheckoutButton;