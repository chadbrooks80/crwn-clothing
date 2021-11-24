import ShopActionTypes from "./shop.types";

import { firestore, convertCollectionSnapshopToMap } from "../../firebase/firebase.utils";

export const fetchCollectionsStart = () => {
    return {
        type: ShopActionTypes.FETCH_COLLECTIONS_START
    }
}

export const fetchCollectionsSuccess = collectionsMap => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
})

export const fetchCollectionsFailure = (errorMessage => ({
    type: ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
}))

export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        // creates Firebase reference for the collection called collections (these are items can shop for)
        const collectionRef = firestore.collection('collections')
        dispatch(fetchCollectionsStart())

        // takes referene and gets snapshot
        collectionRef.get().then(snapshot => {
            // this app converts the snapshot data into the proper object to place into starte
            const collectionsMap = convertCollectionSnapshopToMap(snapshot)
            dispatch(fetchCollectionsSuccess(collectionsMap)) //dispatch into redux store
        }).catch(error => dispatch(fetchCollectionsFailure(error.msg)))
    }
} 