import React, { useEffect } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import './App.css';

import Homepage from './pages/homepage/Homepage.component';
import ShopPage from './pages/shop/Shop.component';
import Header from './components/header/Header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/Sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/Checkout.component';

import { useSelector, useDispatch } from 'react-redux';
import {selectCurrentUser} from './redux/user/user.selectors'
import { checkUserSession } from './redux/user/user.actions';
// import { selectCollectionsForPreview } from './redux/shop/shop.selectors';


const App = () => {

  const currentUser = useSelector(selectCurrentUser);
  const dispatch = useDispatch();

    useEffect(()=>{
      dispatch(checkUserSession())
    },[dispatch])
    
    //a method gived from auth. It aware when somebody login or logout with making a manual fetch.
    //This method need to have in parameter the userAuth which is in the Authentication tabs into firebase
    //When ever a user sign up with email and password, or Google SignIn, the authentification will store the users called userAuth
  //   this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
  //     if (userAuth){
  //       const userRef = await createUserProfileDocument(userAuth);
  //       //this method is listening any changes into the db
  //       userRef.onSnapshot((snapShot)=>{
  //         setCurrentUser({
  //           id:snapShot.id,
  //           ...snapShot.data()
  //         })
  //       })
  //     }else{
  //       setCurrentUser(userAuth)   //is equivalent to null
  //       //We run this function when we decided to move the shop data into firestore
  //       // addCollectionAndDocuments('collections', collectionsArray.map(({title,items})=>({title, items})));
  //     };

  //   });
  // }

  //That will close the subscribtion
  // componentWillUnmount(){
  //   this.unsubscribeFromAuth();


  //With the two lifecycle methods here, this is how we handle our app being awaire of any changes on firebase;

    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={Homepage}/>
          <Route path="/shop" component={ShopPage}/>
          <Route exact path="/checkout" component={CheckoutPage}/>
          {/* The render attribute is used to make a redirection */}
          <Route exact path="/signin" render={()=> 
            currentUser ? 
              <Redirect to="/"/> : 
              <SignInAndSignUpPage/> }
          />
        </Switch>
      </div>
    );
}


//The method need the state reducer in first argument, and the function of setting new state at 2nde argument
export default App;
