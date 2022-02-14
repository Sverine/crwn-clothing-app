import React from "react";

import { SpinnerContainer, SpinnerOverlay } from "../spinner/Spinner.styles";

const Spinner = ()=>{
    return(
        <SpinnerOverlay>
            <SpinnerContainer/>
        </SpinnerOverlay>
    )
};

export default Spinner;