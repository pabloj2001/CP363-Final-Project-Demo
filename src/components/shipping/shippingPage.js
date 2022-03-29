import React from 'react';
import { ProductItem } from '../product';
import { Spinner } from '../spinner';
import $ from 'jquery';
import './shipping.css';

class ShippingPage extends React.Component {
	constructor(props){
		super(props);
		this.state = { items: [] };

		this.fetchItems();
	}

	fetchItems(){
		// Call API here
		$.ajax({
			url: 'http://localhost:3213/add/getShipmentsInfo/',
			success: (data) => {
				this.setState({ items: data.msg });
			}
		});
	}

	render(){
		let total = 0;
		return (
            this.state.items.length > 0 ?
            <div className='page shipping'>
                <div className="shipment-info">
                    <span>Shipment ID: {this.state.items[0].SHIPMENT_ID}</span>
                    <span>Shipment Address: {this.state.items[0].SHIPMENT_ADDRESS}</span>
                    <span>Date Created: {(new Date(this.state.items[0].DATE_CREATED)).toDateString()}</span>
                    <span>Estimated Delivery Date: {(new Date(this.state.items[0].DELIVERY_DATE)).toDateString()}</span>
                </div>
                <div className='item-container'>
                    {
                        this.state.items.map((item, i) => {
                            const cost = parseFloat(item?.TRANS_COST ?? 0);
                            total += cost * (item.ITEM_QUANTITY ?? 1);
                            return <ProductItem
                                key={i}
                                page={'Shipping'}
                                name={item.ITEM_NAME}
                                cat={item.ITEM_CATEGORY}
                                userName={item.USER_FNAME}
                                cost={cost}
                                quantity={item.ITEM_QUANTITY ?? 1}/>
                        })
                    }
                </div>
                <hr/>
                <div className='total'>
                    <span>Item Total: ${total.toFixed(2)}</span>
                    <span>Shipping Cost: ${this.state.items[0].SHIPMENT_PRICE}</span>
                    <span><strong>Total: ${(total + parseFloat(this.state.items[0].SHIPMENT_PRICE)).toFixed(2)}</strong></span>
                </div>
            </div>
            : <Spinner/>
		);
	}
}

export default ShippingPage;