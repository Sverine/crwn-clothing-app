import React from "react";
import { connect } from "react-redux";

import { selectCollection } from "../../redux/shop/shop.selectors";
import CollectionItem from '../../components/collection-item/Collection-item.component';

import './Collection.styles.scss';

const CollectionPage = ({collection})=>{
    const {title,items}= collection
    return(
        <div className="collection-page">
            <h2 className="title">{title}</h2>
            <div className="items">
                {
                    items.map((item)=>{
                        return <CollectionItem key={item.id} item={item}/>
                    })
                }
            </div>
        </div>
    )
}


//The ownProps in the 2n argument is the props of the component that we're wrapping in the connect, and so, including match
const maptStateToProps = (state, ownProps)=>(
    //The (state) is necessary because unlike other selectors, this one needs a part of the sate depending on the URL parameter
    {collection:selectCollection(ownProps.match.params.collectionId)(state)}
    //This method of using two parameters into two parenthesis is called the currying
    //Here is an exemple of currying ----> 
    //const curriedMultiply=(a)=>(b)=>a*b;
    //curriedMultiply(5)(3) <-- return 15
)

export default connect(maptStateToProps)(CollectionPage);