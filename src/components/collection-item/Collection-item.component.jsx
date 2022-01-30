import React from "react";
import { connect } from "react-redux";
import { addItem } from "../../redux/cart/cart.action";

import { CollectionItemContainer, CollectionImgContainer, CollectionCustomButtonContainer, CollectionFooter, CollectionNameContainer, CollectionPriceContainer} from "./Collection-item.styles";

const CollectionItem = ({item, addItem})=> {
    const {name, price, imageUrl} = item;
    return(
        <CollectionItemContainer>
            <CollectionImgContainer className="image" imageUrl={imageUrl}/>
            <CollectionFooter>
                <CollectionNameContainer>{name}</CollectionNameContainer>
                <CollectionPriceContainer>{price}</CollectionPriceContainer>
            </CollectionFooter>
            <CollectionCustomButtonContainer onClick={()=>addItem(item)} inverted>
                Add to Cart
            </CollectionCustomButtonContainer>
        </CollectionItemContainer>
    )
}

  
  const mapDispatchToProps = (dispatch) =>({
    addItem : (item) => dispatch(addItem(item))
  }) 

export default connect(null, mapDispatchToProps)(CollectionItem);