import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore'
import 'firebase/compat/auth'

const config = {
    apiKey: "AIzaSyDB5szCv7gc0ROY5xKsBWzkZeq_6e_iRfg",
    authDomain: "crwn-db-b07b9.firebaseapp.com",
    projectId: "crwn-db-b07b9",
    storageBucket: "crwn-db-b07b9.appspot.com",
    messagingSenderId: "661294505162",
    appId: "1:661294505162:web:4476fc69b3d532c3cfe833"
}

firebase.initializeApp(config)

export const auth = firebase.auth()
export const firestore = firebase.firestore()

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

  // console.log(snapShot)

  if(!snapShot.exists) {
    const {displayName, email} = userAuth
    const createdAt = new Date()

    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      })
    } catch(error) {
      console.log('Error Creating User', error.message)
    }

  }

  return userRef

}

const provider = new firebase.auth.GoogleAuthProvider()
provider.setCustomParameters({prompt: 'select_account' })
export const signInWithGoogle = () => auth.signInWithPopup(provider)

export default firebase