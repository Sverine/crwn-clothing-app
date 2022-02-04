import React from "react";
import Directory from "../../components/directory/Directory.component";

import { HomePageContainer } from "./Homepage.styles";

const Homepage = () =>{
    return(
        <HomePageContainer>
            <Directory/>
        </HomePageContainer>
    )
}

export default Homepage;