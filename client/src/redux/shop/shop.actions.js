import { ShopActionTypes } from "./shop.types";
import { firestore, convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

export const fetchCollectionsStart = (collectionMap)=>(
    {
        type:ShopActionTypes.FETCH_COLLECTIONS_START,
    }
)

export const fetchCollectionsSuccess = ( collectionsMap )=>(
    {
        type:ShopActionTypes.FETCH_COLLECTIONS_SUCCESS,
        payload:collectionsMap
    }
)

export const fetchCollectionsFailure = (errorMessage) =>(
    {
        type:ShopActionTypes.FETCH_COLLECTIONS_FAILURE,
        payload:errorMessage
    }
)

//Old code using Redux Thunk used inside the shop.component
//This methods joins all the different actions written in the reducer
//First, it will run a function which is going to dispatch and create the collectionRef
//And then, it will dispatch/run the function of fetchCollectionStart
//Then, it will get the snapshot from the collectionRef and pass it to the function written in firebase.utils
//Finally, it will dispatch//run the last action which is the success fetch collection's method.
export const fetchCollectionsStartAsync = () => {
    return dispatch => {
        const collectionRef = firestore.collection('collections');
        //Redux will run when the function when it gets called
        dispatch(fetchCollectionsStart())

        // Wenever the collection is changing or is calling, that will execute this function
        collectionRef.get().then((snapshot) =>{
            const collectionsMap = convertCollectionsSnapshotToMap(snapshot)
            //This method comes from the reducer, it allows to pass the collection from firebase into the map
            // updateCollections(collectionsMap)
            dispatch(fetchCollectionsSuccess(collectionsMap))
        }).catch((error)=>{
            dispatch(fetchCollectionsFailure(error))
        })
    }
}