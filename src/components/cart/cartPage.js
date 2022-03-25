import React from 'react';
import { ProductItem } from '../product';
import { Spinner } from '../spinner';
import $ from 'jquery';
import './cart.css';

class CartPage extends React.Component {
	constructor(props){
		super(props);
		this.state = { items: [] };

		this.fetchItems();
	}

	fetchItems(){
		// Call API here
		$.ajax({
			url: 'http://localhost:3213/add/getCartItems/',
			success: (data) => {
				this.setState({ items: data.msg });
			}
		});
	}

	render(){
        let total = 0, totalTrans = 0;
		return (
            this.state.items.length > 0 ?
            <div className='page cart'>
                <div className='item-container'>
                    {
                        this.state.items.map((item, i) => {
                            const cost = parseFloat(item?.ITEM_COST ?? 0) * (item.ITEM_QUANTITY ?? 1);
                            total += cost;
                            totalTrans += parseFloat(item.TRANS_COST ?? 0);
                            return <ProductItem
                                key={i}
                                page={'Cart'}
                                name={item.ITEM_NAME}
                                cat={item.ITEM_CATEGORY}
                                stock={item.ITEM_STOCK}
                                userName={item.USER_FNAME}
                                cost={cost}
                                transCost={item.TRANS_COST ?? 0}
                                quantity={item.ITEM_QUANTITY ?? 1}/>
                        })
                    }
                </div>
                <hr/>
                <div className='total'>
                    <span>Item Total: ${total}</span>
                    <span>Transaction Total: ${totalTrans}</span>
                    <span><strong>Total: ${total + totalTrans}</strong></span>
                    <button className="pay">Pay</button>
                </div>
            </div>
            : <Spinner/>
		);
	}
}

export default CartPage;