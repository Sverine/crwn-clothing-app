import React from "react";

import { CustomButtonContainer } from './Custom-button.styles'

const CustomButton = ({children, ...props})=>{
    return(
        <CustomButtonContainer {...props}
            // {`${isGoogleSignIn ? 'google-sign-in' : ''}
            //  ${inverted ? 'inverted':""}
            // custom-button`} 
            // {...otherProps}
        >
            {children}
        </CustomButtonContainer>
    )
}

export default CustomButton;