import React from 'react';
import { Switch, Route } from 'react-router-dom';
import './App.css';

import Homepage from './pages/homepage/Homepage.component';
import ShopPage from './pages/shop/Shop.component';
import Header from './components/header/Header.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/Sign-in-and-sign-up.component';
import { auth } from './firebase/firebase.utils';


class App extends React.Component {

  constructor(){
    super();
    this.state={
      curentUser: null
    }
  }

  unsubscribeFromAuth = null;
   
  componentDidMount(){
    //a method gived from auth. It aware when somebody login or logout with making a manual fetch.
    //This method need to have in parameter the user state
    this.unsubscribeFromAuth = auth.onAuthStateChanged((user)=>{
      this.setState({curentUser:user});
    })
  }

  //That will close the subscribtion
  componentWillUnmount(){
    this.unsubscribeFromAuth();
  }

  //With the two lifecycle methods here, this is how we handle our app being awaire of any changes on firebase;

  render(){
    return (
      <div>
        <Header currentUser={this.state.curentUser}/>
        <Switch>
          <Route exact path="/" component={Homepage}/>
          <Route path="/shop" component={ShopPage}/>
          <Route path="/signin" component={SignInAndSignUpPage}/>
        </Switch>
      </div>
    );
  }
}

export default App;
