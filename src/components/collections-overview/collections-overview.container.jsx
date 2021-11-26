import { connect } from "react-redux";
import { compose } from "redux";
import { createStructuredSelector } from "reselect";

import { selectIsCollectionFetching } from "../../redux/shop/shop.selectors";
import WithSpinner from "../with-spinner/with-spinner.component";
import collectionsOverview from "./collections-overview.component";

const mapStateToProps = createStructuredSelector({
    isLoading: selectIsCollectionFetching
})


// compose will do the same as the following: 
// connect(mapStateToProps)(WithSpinner(collectionsOverview))
// starts with wrapping collectionsOver into With Spinner, which wraps into Connect.
const CollectionsOverviewContainer = compose(
    connect(mapStateToProps),
    WithSpinner
)(collectionsOverview)

export default CollectionsOverviewContainer