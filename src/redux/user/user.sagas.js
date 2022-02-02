import {takeLatest, put, all, call} from 'redux-saga/effects';

import UserActionTypes from './user.types';
import { signInFailure, signInSuccess, signOuSucess, signOuSFailure, signUpFailure, signUpSuccess, signUpStart } from './user.actions';

import { auth, googleProvider, createUserProfileDocument, getCurrentUser} from '../../firebase/firebase.utils';

//GENERATED FUNCTION
export function* getSnapshotFromUserAuth(userAuth, additionalData){
    try{
        const userRef = yield call(createUserProfileDocument,userAuth, additionalData)
        const userSnapShot = yield userRef.get();

        yield put(signInSuccess({id:userSnapShot.id, ...userSnapShot.data()}))
    }catch(error){
        yield put(signInFailure(error.message))
    }
}


//SIGN UP
export function* signUp({payload:{displayName, email, password}}){
    try{
        const {user} = yield auth.createUserWithEmailAndPassword(email, password);
        // if(password !== confirmPassword){
        //     yield alert("Passwords don't match");
        //     return;
        // }
        // yield call(createUserProfileDocument, user, {displayName})
        yield put(signUpSuccess({user, additionalData:{displayName}}))
    }catch(error){
        yield put(signUpFailure(error))
    }
}

export function* signInAfterSignUp({payload:{user, additionalData}}){
    yield getSnapshotFromUserAuth(user, additionalData);
}


//SIGN IN WITH GOOGLE AND EMAIL
export function* signInWithGoogle(){
    try{
        const {user} = yield auth.signInWithPopup(googleProvider)
        yield getSnapshotFromUserAuth(user)
    }catch(error){
        yield put(signInFailure(error.message))
    }
}


export function* signInWithEmail({payload:{email,password}}){
    try{
        const {user} = yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user)
    }catch(error){
        yield put(signInFailure(error))
    }
}

export function* isUserAuthenticated(){
    try{
        const userAuth = yield getCurrentUser();
        if(!userAuth) return;
        yield getSnapshotFromUserAuth(userAuth)
    }catch(error){
        yield put(signInFailure(error))
    }
}
//SIGN OUT
export function* signOut(){
    try{
        yield auth.signOut();
        yield put(signOuSucess())
    }catch(error){
        yield put(signOuSFailure(error))
    }
}


//ALL SAGAS FUNCTIONS WHICH WE WILL CALL INTO OTHER COMPONENTS
export function* onSignUpStart(){
    yield takeLatest(UserActionTypes.SIGN_UP_START,signUp)
}

export function* onSignUpSuccess(){
    yield takeLatest(UserActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* onGoogleSignInStart(){
    yield takeLatest(UserActionTypes.GOOGLE_SIGN_IN_START,signInWithGoogle)
}

export function* onEmailSignInStart(){
    yield takeLatest(UserActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
}

export function* onCheckUserSession(){
    yield takeLatest(UserActionTypes.CHECK_USER_SESSION,isUserAuthenticated)
}


export function* onSignOut(){
    yield takeLatest(UserActionTypes.SIGN_OUT_START,signOut)
}


//To export all sagas and pass it into the store
export function* userSagas(){
    yield all([
        call(onSignUpStart),
        call(onSignUpSuccess),
        call(onGoogleSignInStart),
        call(onEmailSignInStart),
        call(onCheckUserSession),
        call(onSignOut)
    ])
}
