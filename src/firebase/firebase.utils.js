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

firebase.initializeApp(config);

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


