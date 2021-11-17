import CartActionTypes from './cart.types'

const INITIAL_STATE = {
    hidden: true
}

const cartReducer = (state = INITIAL_STATE, action) => {
    switch(action.type) {
        case CartActionTypes.TOOGLE_CART_HIDDEN:
            console.log('TOGGLED!')
            return {
                ...state,
                hidden: !state.hidden
            }
        default:
            console.log('DEFAULT!')
            return state
    }
}

export default cartReducer