import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import './Collections-overview.styles.scss';

import CollectionPreview from "../collection-preview/Collection-preview.component"
import { selectCollectionsForPreview } from "../../redux/shop/shop.selectors";

const CollectionsOverview = ({collections})=>{
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

const mapStateToProps = createStructuredSelector(
    {collections: selectCollectionsForPreview} 
)

export default connect(mapStateToProps)(CollectionsOverview);