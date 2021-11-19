import { Route, Switch, Redirect } from 'react-router-dom';
import HomePage from './pages/homepage/homepage.compoenent';
import ShopPage from './pages/shop/shop.component';
import Header from './components/header/header.component'
import CheckoutPage from './pages/checkout/checkout.component';
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import {auth, createUserProfileDocument} from './firebase/firebase.utils'

import { selectCurrentUser } from './redux/user/user.selector';
import { createStructuredSelector } from 'reselect';

import { connect } from 'react-redux';
import {setCurrentUser} from './redux/user/user.actions'

import './App.css';
import React from 'react';

class App extends React.Component {

  unsubscribeFromAuth = null;

  componentDidMount() {

    const {setCurrentUser} = this.props

    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        createUserProfileDocument(userAuth).then(userRef => {
          
          userRef.onSnapshot(snapShot => {
            setCurrentUser({
              id: snapShot.id,
              ...snapShot.data()
            })
          })
          
        })

      } else {
        // this would return Null
        setCurrentUser(userAuth)
      }
    })
  }

  // leaern and write here what this lifecycle does
  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <div>
        <Header />
        <Switch>
          <Route exact path='/' component={HomePage} />      
          <Route path='/shop' component={ShopPage} />
          <Route exact 
            path='/signin' 
            render={ () => this.props.currentUser ? 
              (<Redirect to='/' />) :
              (<SignInAndSignUp />) } 
            />
          <Route exact path='/checkout' component={CheckoutPage} />
        </Switch>
      </div>
    )
  }
}

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
  })

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

export default connect(mapStateToProps, mapDispatchToProps)(App)