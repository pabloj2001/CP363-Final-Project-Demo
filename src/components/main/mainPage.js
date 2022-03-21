import React from 'react';
import { ProductItem } from '../product';
import { Spinner } from '../spinner';
import './main.css';
import { SearchBar } from './searchBar';

class MainPage extends React.Component {
	constructor(props){
		super(props);
		this.state = { items: [] };
	}

	fetchItems(){
		// Call API here
	}

	onSearch(searchTerm){
		// Call API here
	}

	render(){
		return (
			<div className='page main'>
				<SearchBar onSearch={this.onSearch.bind(this)}/>
				{
					this.state.items.length > 0
					? this.state.items.map(item => {
						<ProductItem
							name={item.name}
							cat={item.cat}/>
					})
					: <Spinner/>
				}
			</div>
		);
	}
}

export default MainPage;
