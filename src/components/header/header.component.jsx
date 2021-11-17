import React from "react";
import {auth} from '../../firebase/firebase.utils'
import {Link} from "react-router-dom"
import { connect } from "react-redux";


import { ReactComponent as Logo } from '../../assets/crown.svg'
import './header.styles.scss'

const Header = ({currentUser}) => {
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
            </div>
        </div>
    )
}

// this State is the root reducer, or top reducer
const mapStateToProps = state => {
    return ({
    currentUser: state.user.currentUser
    })
}

export default connect(mapStateToProps)(Header)