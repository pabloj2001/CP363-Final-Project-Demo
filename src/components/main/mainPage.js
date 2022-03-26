import React from 'react';
import { ProductItem } from '../product';
import { Spinner } from '../spinner';
import './main.css';
import { SearchBar } from './searchBar';
import $ from 'jquery';

class MainPage extends React.Component {
	constructor(props){
		super(props);
		this.state = { items: [] };

		this.fetchItems();
	}

	fetchItems(){
		// Call API here
		$.ajax({
			url: 'http://localhost:3213/add/getInventoryItems/',
			success: (data) => {
				this.setState({ items: data.msg });
			}
		});
	}

	onSearch(searchTerm){
		if(!searchTerm || searchTerm.length === 0){
			return;
		}

		// Call API here
		$.ajax({
			url: 'http://localhost:3213/add/getSearchInventoryItems/',
			data: {
				'ITEM_NAME': searchTerm
			},
			success: (data) => {
				this.setState({ items: data.msg });
			}
		});
	}

	onAddToCart(listingId){
		$.ajax({	//?LISTING_ID=${listingId}
			url: `http://localhost:3213/add/addedToCart/`,
			method: 'POST',
			data: {
				'LISTING_ID': listingId
			},
			dataType: 'application/json',
			complete: data => {
				if(data && data.status === 201){
					this.fetchItems();
				}
			}
		});
	}

	render(){
		let addedShowsQuery = false;
		return (
			<div className='page main'>
				<SearchBar onSearch={this.onSearch.bind(this)}/>
				<div className='item-container'>
					{
						this.state.items.length > 0
						? this.state.items.map((item, i) => {
							let addShowsQuery = false;
							if(!item.CART_ADDED && !addedShowsQuery){
								addShowsQuery = true;
								addedShowsQuery = true;
							}

							return <ProductItem
								key={i}
								page={'Main'}
								name={item.ITEM_NAME}
								cat={item.ITEM_CATEGORY}
								stock={item.ITEM_STOCK}
								cost={item.ITEM_COST}
								userName={item.USER_FNAME}
								cartAdded={item.CART_ADDED}
								showsQuery={addShowsQuery}
								onAddToCart={() => this.onAddToCart(item.LISTING_ID)}/>
						})
						: <Spinner/>
					}
				</div>
			</div>
		);
	}
}

export default MainPage;