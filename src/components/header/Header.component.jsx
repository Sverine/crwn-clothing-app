import React from "react";
import { auth } from "../../firebase/firebase.utils";
//Hight Order Component (HOC) that let us modify our component to have access to things related to redux
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";


import {ReactComponent as Logo} from '../../assets/crown.svg'
import CartIcon from "../cart-icon/Cart-icon.component";
import CartDropdown from "../cart-dropdown/Cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import {HeaderContainer, LogoContainer, OptionsContainer, OptionLink} from './Header.styles';
import { signOuStart } from "../../redux/user/user.actions";


//currentUser is given by the mapStateToProps method passed in the connect method
const Header = ({currentUser, hidden, signOuStart }) =>{
    return(
        <HeaderContainer>
            <LogoContainer to="/">
                <Logo className="logo"/>
            </LogoContainer>

            <OptionsContainer>
                <OptionLink to="/shop">SHOP</OptionLink>
                <OptionLink to="/shop">CONTACT</OptionLink>
                {
                    currentUser ?
                    //Using "as" is a way to use the style component and place it a div instead of Link component
                    <OptionLink as="div" onClick={signOuStart}>SIGN OUT</OptionLink>
                    :
                    <OptionLink to="/signin"> SIGN IN</OptionLink>
                }
                <CartIcon/>
            </OptionsContainer>
            {
                hidden ? null : <CartDropdown/>
            }
        </HeaderContainer>
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

const mapDispatchToProps = dispatch =>(
    {
        signOuStart:()=>dispatch(signOuStart())
    }
)



//Connect is using to pass the state from a HOC.
export default connect(mapStateToProps,mapDispatchToProps) (Header);