import React, { useState } from "react";
import { connect } from "react-redux";

import { SignInContainer, SignInTitle, ButtonsBarContainer } from "./Sign-in.styles";

import FormInput from "../form-input/Form-input.component";
import CustomButton from "../custom-button/Custom-button.component";
// import { auth, signInWithGoogle } from '../../firebase/firebase.utils'
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions'

const SignIn = ({emailSignInStart, googleSignInStart}) =>{

    const [userCredentials, setUserCredentials] = useState({email:'', password:''});
    const {email, password} = userCredentials;

    const handleSubmit = (e)=>{
        e.preventDefault();
        emailSignInStart(email, password);
        // try{
        //     await auth.signInWithEmailAndPassword(email, password)
        //     this.setState({email:"", password:""})
        // }catch(err){
        //     console.log(err);
        // }
    }

    const handleChange = (e)=>{
        const {name, value}= e.target;
        setUserCredentials({...userCredentials, [name]:value})
    }

    return(
        <SignInContainer>
            <SignInTitle>
                I already have an account
            </SignInTitle>
            <span>Sign in with your email and password</span>

            <form onSubmit={handleSubmit}>
                <FormInput 
                    type="email" 
                    name="email" 
                    value={email}
                    handleChange={handleChange}
                    label="Email"
                    required
                />
                <FormInput 
                    type="password" 
                    name="password" 
                    value={password}
                    handleChange={handleChange}
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

const mapDispatchToProps = dispatch => ({
    googleSignInStart : ()=> dispatch(googleSignInStart()),
    emailSignInStart : (email, password)=> 
        dispatch(emailSignInStart({email,password}))
});

export default connect(null, mapDispatchToProps)(SignIn);