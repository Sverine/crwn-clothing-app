import React, { useEffect, lazy, Suspense } from "react";
import { Route } from "react-router-dom";
import { connect } from "react-redux";

// import CollectionsOverviewContainer from "../../components/collections-overview/Collections-overview.container";
// import CollectionPageContainer from "../../pages/collection/Collection.container";
import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import Spinner from "../../components/spinner/Spinner.component";

const CollectionsOverviewContainer = lazy(()=>import('../../components/collections-overview/Collections-overview.container'))
const CollectionPageContainer = lazy(()=>import('../../pages/collection/Collection.container'))

const ShopPage = ({fetchCollectionsStart, match}) =>{

    useEffect(()=>{
        fetchCollectionsStart()

        //By passing the method inside the userEffect array, we decide to not re render this function even if app is re rendering.
        //When the parent of the component (wich is app) is re render, everything is being called, except if you notice what you don't want to be fired.
    },[fetchCollectionsStart])

        return(
            <div className="shop-page">
                <Suspense fallback={<Spinner/>}>
                    <Route exact path={`${match.path}`} component={CollectionsOverviewContainer}/>
                    <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer}/>
                </Suspense>
            </div>
        )
}


const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart:()=>dispatch(fetchCollectionsStart())
})

export default connect(null, mapDispatchToProps)(ShopPage);