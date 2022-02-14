import React, { useEffect, lazy, Suspense } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';

import { GlobalStyle } from './global.styles';

import Header from './components/header/Header.component';
import Spinner from './components/spinner/Spinner.component';
import ErrorBoundary from './components/error-boundary/error-boundary.component';
// import Homepage from './pages/homepage/Homepage.component';
// import ShopPage from './pages/shop/Shop.component';
// import SignInAndSignUpPage from './pages/sign-in-and-sign-up/Sign-in-and-sign-up.component';
// import CheckoutPage from './pages/checkout/Checkout.component';

import { useSelector, useDispatch } from 'react-redux';
import {selectCurrentUser} from './redux/user/user.selectors'
import { checkUserSession } from './redux/user/user.actions';
// import { selectCollectionsForPreview } from './redux/shop/shop.selectors';


const HomePage = lazy(()=>import('./pages/homepage/Homepage.component'));
const ShopPage = lazy(()=>import('./pages/shop/Shop.component'));
const SignInAndSignUpPage = lazy(()=>import('./pages/sign-in-and-sign-up/Sign-in-and-sign-up.component'));
const CheckoutPage = lazy(()=>import('./pages/checkout/Checkout.component'));

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
        <GlobalStyle/>
        <Header/>
        <Switch>
          <ErrorBoundary>
            <Suspense fallback={<Spinner/>}>
              <Route exact path="/" component={HomePage}/>
              <Route path="/shop" component={ShopPage}/>
              <Route exact path="/checkout" component={CheckoutPage}/>
              {/* The render attribute is used to make a redirection */}
              <Route exact path="/signin" render={()=> 
                currentUser ? 
                <Redirect to="/"/> : 
                <SignInAndSignUpPage/> }
              />
            </Suspense>
          </ErrorBoundary>
        </Switch>
      </div>
    );
}


//The method need the state reducer in first argument, and the function of setting new state at 2nde argument
export default App;
