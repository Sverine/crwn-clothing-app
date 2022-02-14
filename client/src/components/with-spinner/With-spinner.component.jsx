import React from "react";

import Spinner from "../spinner/Spinner.component";

// const WithSpinner = (WrappedComponent) => {
//     const Spinner =  ({isLoading, ...otherProps}) =>{
//         return isLoading ? 
//             <Spinner/>
//             : <WrappedComponent {...otherProps}/>
        
//     }
//     return Spinner;
// };

const WithSpinner = (WrappedComponent)=>({isLoading,...otherProps})=>{
    return isLoading ? <Spinner/> : <WrappedComponent {...otherProps}/>
};

export default WithSpinner;
