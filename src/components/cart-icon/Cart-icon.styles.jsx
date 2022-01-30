import styled from "styled-components";
import {ReactComponent as ShoppingIconSVG} from '../../assets/shopping-bag.svg'

export const CartIconContainer = styled.div`
    width: 45px;
    height: 45px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
`;

//Here, I needed to import the SVG from ReactComponent first as a component
export const CartShoppingIcon = styled(ShoppingIconSVG)`
  width: 24px;
  height: 24px;
`;

export const CartItemCountSpan = styled.span`
    position: absolute;
    font-size: 10px;
    font-weight: bold;
    bottom: 12px;
`;