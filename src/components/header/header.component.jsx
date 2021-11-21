import React from "react";
import {auth} from '../../firebase/firebase.utils'
import { connect } from "react-redux";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import CartIcon from "../cart-icon/cart-icon.component";

import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selector";

import { ReactComponent as Logo } from '../../assets/crown.svg'

import { HeaderContainer, LogoContainer, OptionsContainer, OptionLink} from './header.styles'

const Header = ({currentUser, cartHidden}) => {
    return (
        <HeaderContainer>
            <LogoContainer to="/">
                <Logo className="logo" />
            </LogoContainer>
            <OptionsContainer>
                <OptionLink to="/shop">SHOP</OptionLink>
                <OptionLink to="/contact">CONTACT</OptionLink>
                {
                    currentUser ? 
                    <OptionLink as='div' onClick={() => auth.signOut()}>SIGN OUT</OptionLink>
                    :
                    <OptionLink to='/signin'>SIGN IN</OptionLink>
                }
                <CartIcon />
            </OptionsContainer>
            {cartHidden ? null : (<CartDropdown />)}
        </HeaderContainer>
    )
}

// this createStructuredSelector allows us to not have to pass in state into selectcurrentUser and other function
const mapStateToProps = createStructuredSelector({
        currentUser: selectCurrentUser,
        cartHidden: selectCartHidden
    })

export default connect(mapStateToProps)(Header)