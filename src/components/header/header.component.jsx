import React from "react";
import {auth} from '../../firebase/firebase.utils'
import {Link} from "react-router-dom"
import { connect } from "react-redux";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import CartIcon from "../cart-icon/cart-icon.component";

import { createStructuredSelector } from "reselect";
import { selectCartHidden } from "../../redux/cart/cart.selectors";
import { selectCurrentUser } from "../../redux/user/user.selector";


import { ReactComponent as Logo } from '../../assets/crown.svg'
import './header.styles.scss'

const Header = ({currentUser, cartHidden}) => {
    return (
        <div className="header">
            <Link to="/"  className="logo-container">
                <Logo className="logo" />
            </Link>
            <div className="options">
                <Link to="/shop" className="option">SHOP</Link>
                <Link to="/contact" className="option">CONTACT</Link>
                {
                    currentUser ? 
                    <div className="option" onClick={() => auth.signOut()}>SIGN OUT</div>
                    :
                    <Link className="option" to='/signin'>SIGN IN</Link>
                }
                <CartIcon />
            </div>
            {cartHidden ? null : (<CartDropdown />)}
        </div>
    )
}

// this createStructuredSelector allows us to not have to pass in state into selectcurrentUser and other function
const mapStateToProps = createStructuredSelector({
        currentUser: selectCurrentUser,
        cartHidden: selectCartHidden
    })

export default connect(mapStateToProps)(Header)