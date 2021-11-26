import userActionTypes from './user.types'

export const setCurrentUser = user => {
    return ({
        type: userActionTypes.SET_CURRENT_USER,
        payload: user
    })
}

export const googleSignInStart = () => {
    return {
        type: userActionTypes.GOOGLE_SIGN_IN_START
    }
}

export const googleSignInSuccess = user => ({
    type: userActionTypes.GOOGLE_SIGN_IN_SUCCESS,
    payload: user
})

export const googleSignInFailure = error => ({
    type: userActionTypes.GOOGLE_SIGN_IN_FAILURE,
    payload: error
})

export const emailSignInStart = emailAndPassword => {
    
    return {
        type: userActionTypes.EMAIL_SIGN_IN_START,
        payload: emailAndPassword
    }
}

export const emailSignInSuccess = user => ({
    type: userActionTypes.EMAIL_SIGN_IN_SUCCESS,
    payload: user
})

export const emailSignInFailure = error => ({
    type: userActionTypes.EMAIL_SIGN_IN_FAILURE,
    payload: error
})