import React from 'react';
import './shared.css';
import MainPage from './components/main/mainPage';
import { NavBar } from './components/navBar';
import  CartPage  from './components/cart/cartPage';
import ShippingPage from './components/shipping/shippingPage';
import { SqlPopup } from './components/sqlPopup';
import $ from 'jquery';

class App extends React.Component {
	constructor(props){
		super(props);
		this.hoverTimer = null;
		this.state = { currentPage: 0, query: null };
	}

	componentDidMount(){
		$(document.body).on('mouseenter', '.shows-query', e => {
			if(!this.state.showQuery){
				this.hoverTimer = setTimeout(() => {
					console.log(e);
					this.setState({showQuery: e.target.dataset.query});
				}, 1000);
			}
		});

		$(document.body).on('mouseleave', '.shows-query', e => {
			if(!this.state.showQuery){
				clearTimeout(this.hoverTimer);
				this.setState({showQuery: null});
			}
		});

		$(document.body).on('click', '.sql-popup', e => {
			this.setState({showQuery: null});
		});
	}

	onNavChange(page){
		this.setState({currentPage: page});
	}

	render(){
		return (
			<div className='app'>
				<NavBar onNavChange={this.onNavChange.bind(this)}/>
				{
					this.state.currentPage === 0 && <MainPage/>
				}
				{
					this.state.currentPage === 1 && <ShippingPage/>
				}
				{
					this.state.currentPage === 2 && <CartPage/>
				}
				{
					this.state.showQuery &&
					<SqlPopup query={this.state.showQuery}/>
				}
			</div>
		);
	}
}

export default App;
