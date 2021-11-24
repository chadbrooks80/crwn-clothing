import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import {Route} from 'react-router-dom'

import { fetchCollectionsStartAsync } from "../../redux/shop/shops.actions";
import { selectIsCollectionFetching, selectIsCollectionsLoaded } from "../../redux/shop/shop.selectors";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import CollectionPage from "../collection/collection.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {
    
    componentDidMount() {
        const {fetchCollectionsStartAsync} = this.props
        fetchCollectionsStartAsync()
    }
    
    render() {
            const {match, isCollectionFetching,isCollectionsLoaded} = this.props
            return(
            <div className="shop-page">
                {/* collections overview and colltion page both functions that return the spinner until loading is false. */}
                < Route exact 
                    path={`${match.path}`}
                        render={(props) => 
                            <CollectionsOverviewWithSpinner 
                            isLoading={isCollectionFetching} 
                            {...props} 
                        />
                    }
                />

                < Route 
                    path={`${match.path}/:collectionId`}
                    render={(props) => 
                        <CollectionPageWithSpinner
                            // instructor had it as: isLoading={!isCollectionsLoaded}
                            // but i added this and changed default reducer to undefined 
                            isLoading={isCollectionFetching === undefined || isCollectionFetching}
                            {...props} 
                        />
                    } 
                />
            </div>
        )
    }
} 

const mapStateToProps = createStructuredSelector({
    isCollectionFetching: selectIsCollectionFetching,
    isCollectionsLoaded: selectIsCollectionsLoaded
})

const mapDispatchToProps = dispatch => ({
    fetchCollectionsStartAsync: ()  => dispatch(fetchCollectionsStartAsync())
})

export default connect(mapStateToProps, mapDispatchToProps)(ShopPage)