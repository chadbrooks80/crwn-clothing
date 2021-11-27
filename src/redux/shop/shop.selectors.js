import { createSelector } from "reselect";

const selectShop = state => {
    return state.shop
}

export const selectCollections = createSelector(
    [selectShop],
    shop => {
        return shop.collections
    }
)

// this takes the selectCollections and changes it from an object to an array.
export const selectCollectionsForPreview = createSelector(
    [selectCollections],
    collections => {
        return collections ? Object.keys(collections).map(key => collections[key]) : []
    } 
        
)

export const selectCollection = collectionUrlParam => 
    createSelector(
        [selectCollections],
        collections => collections ? collections[collectionUrlParam] : null
)

// checks if isFetching has changed from false to true so it knows when to stop showing the spinner on 
// the /shop page
export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
)

// this returns true if the shop.collections is not default of Null
export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections 
)