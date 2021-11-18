import React from 'react'
import { connect } from 'react-redux'
import { addItem, clearItemFromCart, removeItem } from '../../redux/cart/cart.actions'

import './checkout-item.styles.scss'


export const CheckoutItem = ({ cartItem, removeItem, increaseQuantity, decreaseQuantity }) => {
    
    const {name, imageUrl, price, quantity} = cartItem
    
    return (
        <div className='checkout-item'>
            <div className="image-container">
                <img alt='item' src={imageUrl}  />
            </div>
            <span className="name">{name}</span>
            <span className="quantity">
                <div
                    className="arrow"
                    onClick={() => decreaseQuantity(cartItem)}
                > &#10094; </div>
                <span className='value'>{quantity}</span>
                <div 
                    className="arrow"
                    onClick={() => increaseQuantity(cartItem)}
                > &#10095; </div>
            </span>
            <span className="price">{price}</span>
            <div 
                className="remove-button"
                onClick={
                    () => removeItem(cartItem)
                } >&#10005;</div>
        </div>
    )
}

const mapDispatchToProps = dispatch => ({
    removeItem: item => dispatch(clearItemFromCart(item)),
    increaseQuantity: item => dispatch(addItem(item)),
    decreaseQuantity: item => dispatch(removeItem(item))
})

export default connect(null, mapDispatchToProps)(CheckoutItem)