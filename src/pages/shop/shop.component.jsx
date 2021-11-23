import React from "react";
import { connect } from "react-redux";
import {Route} from 'react-router-dom'

import { updateCollections } from "../../redux/shop/shops.actions";

import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
import CollectionPage from "../collection/collection.component";

import {firestore, convertCollectionSnapshopToMap} from '../../firebase/firebase.utils'

const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview)
const CollectionPageWithSpinner = WithSpinner(CollectionPage)

class ShopPage extends React.Component {
    state = {
        //this is used to tell if we are still loading the collections from firebase.
        // if not true it will display teh spinner until data has been downloaded it will change to false. 
        loading: true
    }
    
    
    unsubscribeFromSnapshop = null
    
    // connect to firebase database and get collections 
    componentDidMount() {
        
        // creates Firebase reference for the collection called collections (these are items can shop for)
        const collectionRef = firestore.collection('collections')

        // fetch example but not using but another way to get snapshop
        /* 
        fetch('https://firestore.googleapis.com/v1/projects/crwn-db-b07b9/databases/(default)/documents/collections')
        .then(response => response.json())
        .then(collections => console.log("thecollections", collections))
        */

        // takes referene and gets snapshot
        collectionRef.get().then(snapshot => {
            // this app converts the snapshot data into the proper object to place into starte
            const collectionsMap = convertCollectionSnapshopToMap(snapshot)
            this.props.updateCollections(collectionsMap) //dispatch into redux store
            this.setState({loading: false}) //changes loading to false because the redux store has been updated (see the routes below, which reference this state.) 
        })        
        
    }
    
    render() {
            const {match} = this.props
            const {loading} = this.state
            return(
            <div className="shop-page">
                {/* collections overview and colltion page both functions that return the spinner until loading is false. */}
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