import React, {useEffect} from 'react';
import { connect } from 'react-redux';
import { Route, Switch, Redirect } from 'react-router-dom';

import { createStructuredSelector } from 'reselect';
import { selectCurrentUser } from './redux/user/user.selector';

import HomePage from './pages/homepage/homepage.compoenent';
import ShopPage from './pages/shop/shop.component';
import CheckoutPage from './pages/checkout/checkout.component';
import Header from './components/header/header.component'
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import { checkUserSession } from './redux/user/user.actions';

import './App.css';



const App = ({ checkUserSession, currentUser }) => {

  // const unsubscribeFromAuth = null;

  useEffect(() => {
    checkUserSession()
  },[checkUserSession])
  

  // leaern and write here what this lifecycle does
  // componentWillUnmount() {
  //   this.unsubscribeFromAuth()
  // }
  
  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />      
        <Route path='/shop' component={ShopPage} />
        <Route exact 
          path='/signin' 
          render={ () => currentUser ? 
            (<Redirect to='/' />) :
            (<SignInAndSignUp />) } 
          />
        <Route exact path='/checkout' component={CheckoutPage} />
      </Switch>
    </div>
  )
  
}

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
})

export default connect(mapStateToProps, mapDispatchToProps)(App)