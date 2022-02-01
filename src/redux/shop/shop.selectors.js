import { createSelector } from "reselect";
import memoize from 'lodash.memoize';

const selectShop = ( state )=> state.shop;

export const selectCollections= createSelector(
    [selectShop],
    (shop)=>shop.collections
)

export const selectCollectionsForPreview=createSelector(
    [selectCollections],
    (collections)=> collections ? 
    Object.keys(collections).map((key)=>collections[key])
    : []
)

export const selectCollection = memoize((collectionUrlParam)=>{
    return createSelector(
        [selectCollections],
        (collections) => collections ? collections[collectionUrlParam] : null
        // collections => (collections ? collections[collectionUrlParam] : null)
    )}
)

export const selectIsCollectionFetching = createSelector(
    [selectShop],
    (shop)=> shop.isFetching
)

export const selectIsCollectionsLoaded = createSelector(
    [selectShop],
    //!! is a way to return a boolean if the variable existing or not (in this case, if shop.collections is empty or not)
    (shop)=> !!shop.collections
)