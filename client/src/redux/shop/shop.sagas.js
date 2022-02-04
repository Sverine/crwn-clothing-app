//takeEvery allow to create a non-blocking call in order to no stop the app to continue running other saga
//takeLatest will cancel the current call which is running to execute the last one, instead of takeEvery which will execute all async function, even with the delay
//It doesn't pause the JS 
import { takeLatest, call, put, all } from 'redux-saga/effects';
import { firestore, convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';

import { fetchCollectionsSuccess, fetchCollectionsFailure  } from './shop.actions';

import { ShopActionTypes } from './shop.types';


//Thanks to this method, we generated an async function
//The function is sagafied
export function* fetchCollectionAsync(){
    try{
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
    
        //call is a method taht takes as at 1 argument, some function, and at second the parameter we want to pass into this function
        //we need to yield this call in case this function takes longer than we expect
        const collectionsMap = yield call (convertCollectionsSnapshotToMap,snapshot);
        //instead of call, put is used to dispatch actions
        yield put(fetchCollectionsSuccess(collectionsMap))
    }catch(error){
        yield put(fetchCollectionsFailure(error.message))
    }
}


export function* fetchCollectionsStart(){
    //The second argument will be the action to execute after response of the first argument
    yield takeLatest(ShopActionTypes.FETCH_COLLECTIONS_START,fetchCollectionAsync)
}


export function* shopSagas(){
    yield all([call(fetchCollectionsStart)])
}