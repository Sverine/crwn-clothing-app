import React from "react";
import { Link } from "react-router-dom";
import {ReactComponent as Logo} from '../../assets/crown.svg'
import { auth } from "../../firebase/firebase.utils";
//Hight Order Component (HOC) that let us modify our component to have access to things related to redux
import { connect } from "react-redux";

import './Header.styles.scss';

//currentUser is given by the mapStateToProps method passed in the connect method
const Header = ({currentUser}) =>{
    return(
        <div className="header">
            <Link className="logo-container" to="/">
                <Logo className="logo"/>
            </Link>

            <div className="options">
                <Link className="option" to="/shop">SHOP</Link>
                <Link className="option" to="/shop">CONTACT</Link>
                {
                    currentUser ?
                    <div className="option" onClick={()=>auth.signOut()}>SIGN OUT</div>
                    :
                    <Link className="option" to="/signin"> SIGN IN</Link>
                }
            </div>
        </div>
    )
}

//Can be anything but this name is a standard redux codebases.
//This method is used to get the state from reducer (which is passed in argument) from store
//state is used to avoid writting store.getState()
//We defined that the currentUser var is equal to the state registered from the reducer
//By this way, this var can be used in the component 
const mapStateToProps = (state) =>({
    currentUser: state.user.currentUser
})

//Connect is using to pass the state from a HOC.
export default connect(mapStateToProps) (Header);