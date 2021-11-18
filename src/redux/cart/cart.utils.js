export const addItemToCart = (cartItems, cartItemToAdd) => {
    const existingCartItem = cartItems.find(cartItem => {
        return cartItem.id === cartItemToAdd.id
    })
    
    
    if(existingCartItem) {
        return cartItems.map(cartItem => 
            cartItem.id === cartItemToAdd.id ? 
            {...cartItem, quantity: cartItem.quantity + 1} : 
            cartItem
        )
    }

    return [...cartItems, {...cartItemToAdd, quantity: 1}]
}

export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    if(cartItemToRemove.quantity === 1) return cartItems.filter(item => item.id !== cartItemToRemove.id)

    return cartItems.map(item => {
        if(item.id !== cartItemToRemove.id) return item
        return {...item, quantity: item.quantity - 1}
    })

}