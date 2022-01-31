import React from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

import WithSpinner from "../../components/with-spinner/With-spinner.component";

import CollectionsOverview from "../../components/collections-overview/Collections-overview.component"
import CollectionPage from "../collection/Collection.component";
import { firestore, convertCollectionsSnpashotToMap } from '../../firebase/firebase.utils'
import {updateCollections} from '../../redux/shop/shop.actions';

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class ShopPage extends React.Component{
    state={
        loading:true
    };

    unsubscriberFromSnapshot = null;

    componentDidMount(){
        const { updateCollections } = this.props;
        const collectionRef = firestore.collection('collections');

        // Wenever the collection is changing or is calling, that will execute this function
        collectionRef.get().then((snapshot) =>{
            const collectionsMap = convertCollectionsSnpashotToMap(snapshot)
            //This method comes from the reducer, it allows to pass the collection from firebase into the map
            updateCollections(collectionsMap)
            this.setState({loading:false})
        })
    }
    render(){
        const {match} = this.props;
        const {loading} = this.state;
        return(
            <div className="shop-page">
                <Route exact path={`${match.path}`} render={(props)=>
                    <CollectionsOverviewWithSpinner isLoading={loading} {...props}/>}/>
                <Route path={`${match.path}/:collectionId`} render={(props)=>
                    <CollectionPageWithSpinner isLoading={loading} {...props}/>}/>
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => ({
        updateCollections : collectionMap =>dispatch(updateCollections(collectionMap))
    })

export default connect(null, mapDispatchToProps)(ShopPage);