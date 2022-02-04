import React from "react";

import './Collections-overview.styles.scss';

import CollectionPreview from "../collection-preview/Collection-preview.component"
import { selectCollectionsForPreview } from "../../redux/shop/shop.selectors";
import { useSelector } from "react-redux";

const CollectionsOverview = ()=>{

    const collections = useSelector(selectCollectionsForPreview);

    return(
        <div className="collections-overview">
            {
                collections.map(({id, ...otherCollectionProps})=>(
                    <CollectionPreview key={id} {...otherCollectionProps}/>
                ))
            }
        </div>
    )
}


export default CollectionsOverview;