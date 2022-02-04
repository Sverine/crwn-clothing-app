import React from "react";


import {ReactComponent as Logo} from '../../assets/crown.svg'
import CartIcon from "../cart-icon/Cart-icon.component";
import CartDropdown from "../cart-dropdown/Cart-dropdown.component";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selectors";
import {HeaderContainer, LogoContainer, OptionsContainer, OptionLink} from './Header.styles';
import { signOuStart } from "../../redux/user/user.actions";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";


const Header = () =>{

    const currentUser = useSelector(selectCurrentUser);
    const hidden = useSelector(selectCartHidden);
    const dispatch = useDispatch();

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
                    <OptionLink as="div" onClick={()=>dispatch(signOuStart())}>SIGN OUT</OptionLink>
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


//Connect is using to pass the state from a HOC.
export default Header;