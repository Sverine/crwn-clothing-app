// import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";
import WithSpinner from "../with-spinner/With-spinner.component";
import CollectionsOverview from "./Collections-overview.component";

const mapStateToProps = createStructuredSelector({
    isLoading:selectIsCollectionFetching
});

// compose method from redux is a way to make easier the way to write HOC instead of =>
// const CollectionsOverviewContainer = connect(mapStateToProps)(WithSpinner(CollectionsOverview))
const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionsOverview)

export default CollectionsOverviewContainer;



