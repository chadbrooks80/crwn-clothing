import React from "react";
import {auth} from '../../firebase/firebase.utils'
import {Link} from "react-router-dom"
import { connect } from "react-redux";
import CartDropdown from "../cart-dropdown/cart-dropdown.component";
import CartIcon from "../cart-icon/cart-icon.component";


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

// this State is the root reducer, or top reducer
// nested destructuring access the state.user.currentUser
const mapStateToProps = ({user: {currentUser}, cart: {hidden} }) => {
    return ({
        currentUser,  // destructor above accesses the: state.user.currentUser
        cartHidden: hidden
    })
}

export default connect(mapStateToProps)(Header)