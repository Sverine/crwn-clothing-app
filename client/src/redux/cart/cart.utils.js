export const addItemToCart = (cartItems, cartItemToAdd)=>{

    const existingCartItem = cartItems.find((cartItem)=>{
        return cartItem.id === cartItemToAdd.id
    });

    if(existingCartItem){
        return cartItems.map((cartItem)=>{
            return cartItem.id === cartItemToAdd.id ? 
            {...cartItem, quantity:cartItem.quantity + 1}
            : cartItem
        })
    }

    return [...cartItems, {...cartItemToAdd, quantity:1}]
}

export const removeItemFromCart = (cartItems, cartItemToRemove)=>{
    const existingCartItem = cartItems.find((cartItem)=>{
        return cartItem.id === cartItemToRemove.id;
    });

    //If quantity is 1, remove it
    if (existingCartItem.quantity === 1){
        return cartItems.filter((cartItem)=> cartItem.id !== cartItemToRemove.id)
    }

    //otherwise, decrease the quantity by one
    return cartItems.map((cartItem)=>{
        return cartItem.id === cartItemToRemove.id ?
            {...cartItem, quantity: cartItem.quantity -1}
            : cartItem
    })
}