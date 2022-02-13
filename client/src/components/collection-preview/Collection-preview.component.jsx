import React from "react";
import { withRouter } from 'react-router-dom';

import { CollectionPreviewContainer, TitleContainer, PreviewContainer } from "./Collection-preview.styles";

import CollectionItem from "../collection-item/Collection-item.component";

const CollectionPreview = ({title, items, history, match, routeName})=>{
    return (
        <CollectionPreviewContainer className="collection-preview">
            <TitleContainer className="title" onClick={() => history.push(`${match.path}/${routeName}`)}>{title.toUpperCase()}</TitleContainer>
            <PreviewContainer className="preview">
                {
                    items
                    .filter((item,index)=>index<4)
                    .map((item)=>(
                        <CollectionItem key={item.id} item={item}/>
                    ))
                }
            </PreviewContainer>
        </CollectionPreviewContainer>
    )
}

export default withRouter(CollectionPreview);