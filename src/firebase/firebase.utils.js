import firebase from 'firebase/compat/app'
import 'firebase/compat/firestore';
import 'firebase/compat/auth';


//on enregistre dans une const la config donnée par firebase
const config = {
        apiKey: "AIzaSyCnNLHL3AkI2q5kt4qo0WIZRMz8mtSknRw",
        authDomain: "crwn-db-c0649.firebaseapp.com",
        projectId: "crwn-db-c0649",
        storageBucket: "crwn-db-c0649.appspot.com",
        messagingSenderId: "68288093268",
        appId: "1:68288093268:web:90ef7089dca8e1de91a1c1",
        measurementId: "G-NM8LZVZJ7V"
};

export const createUserProfileDocument = async (userAuth, additionalData)=>{
    if (!userAuth) return;
    
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapShot = await userRef.get();

    if(!snapShot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            //.post is replace by .set here
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...additionalData
            })
        }catch(err){
            console.log('error creating user', err.message)
        }
    }
    return userRef;
}

firebase.initializeApp(config);


//This method is usefull if we decided to move data from app to Firestore
export const addCollectionAndDocuments= async (collectionKey,objectsToAdd)=>{
    const collectionRef = firestore.collection(collectionKey);

    //is used when we need to run multiple function in a row
    const batch = firestore.batch();
    objectsToAdd.forEach((object)=>{
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef,object)
    });

    return await batch.commit();
}

export const convertCollectionsSnpashotToMap = (collections) =>{
    const transformedCollection = collections.docs.map((doc)=>{
        const {title,items} = doc.data();

        return {
            //native JS method to convert string value into redeable URL string
            routeName:encodeURI(title.toLowerCase()),
            id:doc.id,
            title,
            items
        }
    });

    //This method is used to pass the data of transformedCollection into reducer
    //We use the reducer function to push all collections into arrays at every iteration of collections
    return transformedCollection.reduce((accumulator, collection)=>{
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    },{})
}

//authentification
export const auth=firebase.auth();

export const firestore=firebase.firestore();

//Google authentification
const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt:'select_account'});
export const signInWithGoogle = () =>(
    //this method need to have in argument the method we want to use for authentification
    //There is many popup possible, in this case, we use the Google one
    auth.signInWithPopup(provider)
);

export default firebase;


