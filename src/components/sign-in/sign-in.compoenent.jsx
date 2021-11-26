import React from "react";
import { connect } from "react-redux";
import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { auth, signInWithGoogle } from "../../firebase/firebase.utils";
import { googleSignInStart } from "../../redux/user/user.actions";


import './sign-in.styles.scss'

class SignIn extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = event => {
        const {value, name} = event.target
        this.setState({
            [name]: value
        })
    }
    
    handleSubmit = async event => {
        event.preventDefault()

        const {email, password} = this.state

        try {
            await auth.signInWithEmailAndPassword(email, password)
            this.setState({ email: '', password: '' })
        } catch(error) {
            console.log(error)
        }

        
    }

    render() {
        const {googleSignInStart} = this.props
        return (
        <div className="sign-in">
            <h2>I already have an account</h2>
            <span>Sign in with your email and password</span>

            <form onSubmit={this.handleSubmit}>
                <FormInput 
                    type="email" 
                    name="email" 
                    handleChange={this.handleChange} 
                    value={this.state.email} 
                    label="email"
                    required 
                />
                <FormInput 
                    type="password"
                    name="password"
                    value={this.state.password} 
                    handleChange={this.handleChange}
                    label="password"
                    required 
                />
                <div className="buttons">
                    <CustomButton type="submit">Sign In</CustomButton>
                    <CustomButton type="button" onClick={ this.props.googleSignInStart } isGoogleSignIn>Sign In with Google</CustomButton>
                </div>
            </form>
        </div>
    )}
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart: () => dispatch(googleSignInStart())
})

export default connect(null, mapDispatchToProps)(SignIn)