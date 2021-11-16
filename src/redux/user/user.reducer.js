const INITIAL_STATE = {
    currentUser: null
}

// The state = INITIAL_STATE is the default value if none is given. 
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.tyle) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: action.payload
            }
        default:
            return state
    }
}

export default userReducer