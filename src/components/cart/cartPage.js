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
        let total = 0;
		return (
            this.state.items.length > 0 ?
            <div className='page cart'>
                <div className='item-container'>
                    {
                        this.state.items.map((item, i) => {
                            const cost = parseFloat(item?.TRANS_COST ?? 0);
                            total += cost * (item.ITEM_QUANTITY ?? 1);
                            return <ProductItem
                                key={i}
                                page={'Cart'}
                                name={item.ITEM_NAME}
                                cat={item.ITEM_CATEGORY}
                                stock={item.ITEM_STOCK}
                                userName={item.USER_FNAME}
                                cost={cost}
                                quantity={item.ITEM_QUANTITY ?? 1}/>
                        })
                    }
                </div>
                <hr/>
                <div className='total'>
                    <span><strong>Item Total: ${(total).toFixed(2)}</strong></span>
                    <button className="pay">Pay & Ship</button>
                </div>
            </div>
            : <Spinner/>
		);
	}
}

export default CartPage;