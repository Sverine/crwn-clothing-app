import React from "react";
import { Link } from "react-router-dom";
import {ReactComponent as Logo} from '../../assets/crown.svg'
import { auth } from "../../firebase/firebase.utils";
//Hight Order Component (HOC) that let us modify our component to have access to things related to redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";


import CartIcon from "../cart-icon/Cart-icon.component";
import CartDropdown from "../cart-dropdown/Cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";

import './Header.styles.scss';

//currentUser is given by the mapStateToProps method passed in the connect method
const Header = ({currentUser, hidden}) =>{
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
                <CartIcon/>
            </div>
            {
                hidden ? null : <CartDropdown/>
            }
        </div>
    )
}

//Can be anything but this name is a standard redux codebases.
//This method is used to get the state from reducer (which is passed in argument) from store
//state is used to avoid writting store.getState()
//We defined that the currentUser var is equal to the state registered from the reducer
//By this way, this var can be used in the component 

// const mapStateToProps = (state) =>({
//     currentUser: selectCurrentUser(state),
//     hidden : selectCartHidden(state)
// })


//This new method from reselect is used to avoid passing the state everytime into our select methods
//Even if we pass only one state into the function, is still a good practise to use it if we decide to add more in the futur
const mapStateToProps = createStructuredSelector({
    currentUser:selectCurrentUser,
    hidden:selectCartHidden
})



//Connect is using to pass the state from a HOC.
export default connect(mapStateToProps) (Header);