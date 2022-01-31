import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import './App.css';

import Homepage from './pages/homepage/Homepage.component';
import ShopPage from './pages/shop/Shop.component';
import Header from './components/header/Header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/Sign-in-and-sign-up.component';
import CheckoutPage from './pages/checkout/Checkout.component';

import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { connect } from 'react-redux';
import { setCurrentUser } from './redux/user/user.actions';
import {selectCurrentUser} from './redux/user/user.selectors'
// import { selectCollectionsForPreview } from './redux/shop/shop.selectors';


class App extends React.Component {
  unsubscribeFromAuth = null;
   
  componentDidMount(){

    //This allow us to avoid write this.props.setCurrentUser;
    const { setCurrentUser } = this.props;
    
    
    //a method gived from auth. It aware when somebody login or logout with making a manual fetch.
    //This method need to have in parameter the userAuth which is in the Authentication tabs into firebase
    //When ever a user sign up with email and password, or Google SignIn, the authentification will store the users called userAuth
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth =>{
      if (userAuth){
        const userRef = await createUserProfileDocument(userAuth);
        //this method is listening any changes into the db
        userRef.onSnapshot((snapShot)=>{
          setCurrentUser({
            id:snapShot.id,
            ...snapShot.data()
          })
        })
      }else{
        setCurrentUser(userAuth)   //is equivalent to null
        //We run this function when we decided to move the shop data into firestore
        // addCollectionAndDocuments('collections', collectionsArray.map(({title,items})=>({title, items})));
      };

    });
  }

  //That will close the subscribtion
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  //With the two lifecycle methods here, this is how we handle our app being awaire of any changes on firebase;

  render(){
    return (
      <div>
        <Header/>
        <Switch>
          <Route exact path="/" component={Homepage}/>
          <Route path="/shop" component={ShopPage}/>
          <Route exact path="/checkout" component={CheckoutPage}/>
          {/* The render attribute is used to make a redirection */}
          <Route exact path="/signin" render={()=> 
            this.props.currentUser ? 
              <Redirect to="/"/> : 
              <SignInAndSignUpPage/> }
          />
        </Switch>
      </div>
    );
  }
}

const mapStateToProps = createStructuredSelector ({
  currentUser : selectCurrentUser,
  // collectionsArray : selectCollectionsForPreview
})

//This method is used to set the state in the reducer thanks to payload action
const mapDispatchToProps = (dispatch) =>({
  //user can be name as well as we want
  setCurrentUser : (user) => dispatch(setCurrentUser(user)),
}) 

//The method need the state reducer in first argument, and the function of setting new state at 2nde argument
export default connect(
  mapStateToProps,
  mapDispatchToProps)
(App);
