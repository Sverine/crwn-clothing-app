import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { compose } from "redux";

import { selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors";
import WithSpinner from "../../components/with-spinner/With-spinner.component";
import CollectionPage from './Collection.component'

const mapStateToProps = createStructuredSelector(
    {isLoading:state=>!selectIsCollectionsLoaded(state)}
)

const CollectionPageContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(CollectionPage);

export default CollectionPageContainer;