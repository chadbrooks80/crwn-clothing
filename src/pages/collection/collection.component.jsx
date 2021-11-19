import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import CollectionItem from '../../components/collection-item/collection-item.component'

import { selectCollection } from "../../redux/shop/shop.selectors";

import './collection.styles.scss'

const CollectionPage = ({collection}) => {
    console.log("collection!", collection)
    return (
        <div className='collection-page'>
            <h2>Collection Page</h2>
        </div>
    )
}

const mapStateToProps = (state, ownprops) => ({
    collection: selectCollection(ownprops.match.params.collectionId)(state)
})

export default connect(mapStateToProps)(CollectionPage)