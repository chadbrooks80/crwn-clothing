import userActionTypes from './user.types'

export const googleSignInStart = () => {
    return {
        type: userActionTypes.GOOGLE_SIGN_IN_START
    }
}

export const emailSignInStart = emailAndPassword => {
    
    return {
        type: userActionTypes.EMAIL_SIGN_IN_START,
        payload: emailAndPassword
    }
}

export const signInSuccess = user => {
    return {
        type: userActionTypes.SIGN_IN_SUCCESS,
        payload: user
    }
}

export const signInFailure = error => ({
    type: userActionTypes.SIGN_IN_FAILURE,
    payload: error
})

export const checkUserSession = () => ({
    type: userActionTypes.CHECK_USER_SESSION
})