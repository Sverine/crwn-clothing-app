import React from "react";
import { connect } from "react-redux";

import { SignInContainer, SignInTitle, ButtonsBarContainer } from "./Sign-in.styles";

import FormInput from "../form-input/Form-input.component";
import CustomButton from "../custom-button/Custom-button.component";
// import { auth, signInWithGoogle } from '../../firebase/firebase.utils'
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions'

class SignIn extends React.Component{
    constructor(){
        super();
        this.state={
            email:"",
            password:""
        }
    }

    handleSubmit = (e)=>{
        e.preventDefault();
        const {emailSignInStart} = this.props;
        const {email, password} = this.state;
        emailSignInStart(email, password);
        // try{
        //     await auth.signInWithEmailAndPassword(email, password)
        //     this.setState({email:"", password:""})
        // }catch(err){
        //     console.log(err);
        // }
    }

    handleChange = (e)=>{
        const {value, name}= e.target;
        this.setState({[name]:value})
    }

    render(){
        const {googleSignInStart} = this.props;
        return(
            <SignInContainer>
                <SignInTitle>
                    I already have an account
                </SignInTitle>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        type="email" 
                        name="email" 
                        value={this.state.email}
                        handleChange={this.handleChange}
                        label="Email"
                        required
                    />
                    <FormInput 
                        type="password" 
                        name="password" 
                        value={this.state.password}
                        handleChange={this.handleChange}
                        label="Password"
                        required
                    />
                    <ButtonsBarContainer>
                        <CustomButton type="submit">Sign in</CustomButton>
                        <CustomButton type="button" onClick={googleSignInStart} isGoogleSignIn>Sign in with Google</CustomButton>
                    </ButtonsBarContainer>
                </form>
            </SignInContainer>
        )
    }
}

const mapDispatchToProps = dispatch => ({
    googleSignInStart : ()=> dispatch(googleSignInStart()),
    emailSignInStart : (email, password)=> 
        dispatch(emailSignInStart({email,password}))
});

export default connect(null, mapDispatchToProps)(SignIn);