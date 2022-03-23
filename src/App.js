import React from 'react';
import './shared.css';
import MainPage from './components/main/mainPage';
import { NavBar } from './components/navBar';
import  CartPage  from './components/cart/cartPage';
import ShippingPage from './components/shipping/shippingPage';

class App extends React.Component {
	constructor(props){
		super(props);
		this.state = { currentPage: 0 };
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
			</div>
		);
	}
}

export default App;
