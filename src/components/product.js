export function ProductItem(props){
    return (
        <div className="product-item">
            <div className="product-section">
                <span style={{fontSize: '2rem'}}>{props.name}</span>
                <span>{props.cat}</span>
            </div>
            <div className="separator"></div>
            <div className="product-section">
                <span><strong>${props.cost}</strong></span>
                {
                    props.page !== 'Main' &&
                    <span>Transaction Cost: ${props.transCost}</span>
                }
                {
                    props.page !== 'Main' &&
                    <span>Qty: {props.quantity}</span>
                }
            </div>
            <div className="product-section">
                {
                    props.page !== 'Shipping' &&
                    <span style={{fontSize: '1rem'}}>{props.stock} in Stock</span>
                }
                <span>Sold By: {props.userName}</span>
                <span>Delivered date : {props.shipDate}</span>
            </div>
            {
                props.page !== 'Shipping' && props.onAddToCart &&
                <button className={props.showsQuery ? 'shows-query' : ''}
                    disabled={props.page === 'Main' && props.cartAdded === 1}
                    onClick={props.onAddToCart.bind(this)}>
                    {
                        props.page === 'Main'
                            ? (props.cartAdded === 1 ? 'Already in Cart' : 'Add to Cart')
                            : 'Remove'
                    }
                </button>
            }
        </div>
    );
}