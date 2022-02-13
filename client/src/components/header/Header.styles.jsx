import styled, { css } from "styled-components";
import { Link } from "react-router-dom";


//css allow us to add css into styled component by using ${}
//It's used to avoid writting multiple same css code into style components
// const OptionContainerStyles = css`
//     padding: 10px 15px;
//     cursor: pointer;
// `

export const HeaderContainer = styled.div`
    height: 70px;
    width: 100%;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;

    @media screen and (max-width:800px){
        height:60px;
        padding:10px;
        margin-bottom:20px;
    }

`
//Instead of writting strings by using a dot, we can use styled as a function where we can pass a component as argument
//It's a way to extends a styled component into components 
export const LogoContainer = styled(Link)`
    height: 100%;
    width: 70px;
    padding: 25px;

    @media screen and (max-width:800px){
        width:50px;
        padding:0;
    }
`

export const OptionsContainer = styled.div`
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    @media screen and (max-width:800px){
        width: 80%;
    }

`

export const OptionLink = styled(Link)`
    padding: 10px 15px;
    cursor: pointer;
`