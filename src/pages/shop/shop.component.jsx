import react from "react";
import SHOP_DATA from './shop.data'

class ShopPage extends react.Component {
    constructor(props) {
        super(props)

        this.state = {
            collections: SHOP_DATA
        }

    }
}