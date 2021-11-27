import {takeLatest, call, put } from 'redux-saga/effects';
import ShopActionTypes from './shop.types';
import { firestore, convertCollectionSnapshopToMap  } from '../../firebase/firebase.utils';
import {
    fetchCollectionsSuccess,
    fetchCollectionsFailure
} from './shops.actions'

export function* fetchCollectionsAsync() {
    try {
        // creates Firebase reference for the collection called collections (these are items can shop for)
        const collectionRef = firestore.collection('collections')
        const snapshot = yield collectionRef.get()
        
        // for call, first parameter is the function to envoke, and
        // any others are parameters, this is the same as envoking the following:
        // convertCollectionSnapshopToMap(snapshot)
        const collectionsMap = yield call(convertCollectionSnapshopToMap, snapshot) 
        
        // put is saga way to dispatch action just like dispatch in mapDispatchtoProps and redux thunk
        yield put(fetchCollectionsSuccess(collectionsMap))
    } catch(error) {
        yield put(fetchCollectionsFailure(error.message))
    }
}

export function* fetchCollectionsStart() {
    yield takeLatest(
        ShopActionTypes.FETCH_COLLECTIONS_START,
        fetchCollectionsAsync
    )
}