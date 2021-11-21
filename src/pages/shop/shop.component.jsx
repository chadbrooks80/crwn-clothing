import React from "react";
import { connect } from "react-redux";

import {Route} from 'react-router-dom'

import { updateCollections } from "../../redux/shop/shops.actions";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import CollectionPage from "../collection/collection.component";

import {firestore, convertCollectionSnapshopToMap} from '../../firebase/firebase.utils'
import collectionsOverviewComponent from "../../components/collections-overview/collections-overview.component";

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {
    state = {
        loading: true
    }
    
    
    unsubscribeFromSnapshop = null

    

    componentDidMount() {
        const collectionRef = firestore.collection('collections')
        // collectionRef.get().then(ref => console.log('ref', ref))

        this.unsubscribeFromSnapshop = collectionRef.onSnapshot(async snapshot => {
            const collectionsMap = convertCollectionSnapshopToMap(snapshot)
            this.props.updateCollections(collectionsMap)
            this.setState({loading: false})
        })
    }
    
    render() {
            const {match} = this.props
            const {loading} = this.state
            return(
            <div className="shop-page">
                < Route exact path={`${match.path}`} render={(props) => <CollectionsOverviewWithSpinner isLoading={loading} {...props} />} />
                < Route path={`${match.path}/:collectionId`} render={(props) => <CollectionPageWithSpinner isLoading={loading} {...props} />} />
            </div>
        )
    }
} 

const mapDispatchToProps = dispatch => ({
    updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage)