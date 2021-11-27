import userActionTypes from './user.types'

const INITIAL_STATE = {
    currentUser: null,
    error: null
}

// The state = INITIAL_STATE is the default value if none is given. 
const userReducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case userActionTypes.SIGN_IN_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                error: null
            }
        case userActionTypes.SIGN_OUT_SUCCESS:
            return {
                ...state,
                currentUser: null,
                error: null
            }
        
        case userActionTypes.SIGN_IN_FAILURE:
            case userActionTypes.SIGN_OUT_FAILURE:
            return {
                ...state,
                error: action.payload
            }
        default:
            return state
    }
}

export default userReducer