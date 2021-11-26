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

// this function receives the collections snapshop gets the data from doc.data() and then codes into the correct format to place into redux store. 
export const convertCollectionSnapshopToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const {title, items} = doc.data()
    return {
      routeName: encodeURI( title.toLowerCase() ),
      id: doc.id,
      title,
      items
    }
  })
  
  const finalCollectionToReturn = {}
  transformedCollection.forEach(collection => {
    finalCollectionToReturn[collection.title.toLowerCase()] = collection
  })

  return finalCollectionToReturn;

  
  // return transformedCollection.reduce((accumulator, collection) => {
  //   console.log("title", collection.title)
  //   accumulator[collection.title.toLowerCase()] = collection
  //   return accumulator
  // })
}

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if(!userAuth) return

  const userRef = firestore.doc(`users/${userAuth.uid}`)

  const snapShot = await userRef.get()

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

export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
  const collectionRef = firestore.collection(collectionKey)
  console.log("collectionRef", collectionRef)

  const batch = firestore.batch()
  objectsToAdd.forEach(obj => {
    const newDocRef = collectionRef.doc()
    batch.set(newDocRef, obj)
  })


  return await batch.commit()

}



export const googleProvider = new firebase.auth.GoogleAuthProvider()

googleProvider.setCustomParameters({prompt: 'select_account' })

export const signInWithGoogle = () => auth.signInWithPopup(googleProvider)

export default firebase