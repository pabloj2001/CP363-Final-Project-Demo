export function SqlPopup(props){
    const queries = {
        'select-items': (
            <p>
                <span className="keyword">SELECT</span> Listing.LISTING_ID, USER_FNAME, Inventory.*, Listing.ITEM_COST,
                <br/>&emsp;<span className="sub-query">(SELECT COUNT(*) FROM Transaction WHERE
                <br/>&emsp;Transaction.LISTING_ID = Listing.LISTING_ID
                <br/>&emsp;AND BUYER_ID = <span className="input">3</span> AND SHIPMENT_ID IS NULL)</span> &gt; 0 <span className="keyword">AS</span> CART_ADDED
                <br/><span className="keyword">FROM</span> Listing
                <br/><span className="keyword">LEFT JOIN</span> Inventory
                <br/>&emsp;<span className="keyword">ON</span> Listing.ITEM_ID = Inventory.ITEM_ID 
                <br/><span className="keyword">LEFT JOIN</span> Users
                <br/>&emsp;<span className="keyword">ON</span> Users.USER_ID = Listing.USER_ID
                <br/><span className="keyword">WHERE</span> Listing.IS_AVAILABLE = 1
            </p>
        ),
        'search-items': (
            <p>
                <span className="keyword">SELECT</span> Listing.LISTING_ID, USER_FNAME, Inventory.*, Listing.ITEM_COST,
                <br/>&emsp;<span className="sub-query">(SELECT COUNT(*) FROM Transaction WHERE
                <br/>&emsp;Transaction.LISTING_ID = Listing.LISTING_ID
                <br/>&emsp;AND BUYER_ID = <span className="input">3</span> AND SHIPMENT_ID IS NULL)</span> &gt; 0 <span className="keyword">AS</span> CART_ADDED
                <br/><span className="keyword">FROM</span> Listing
                <br/><span className="keyword">LEFT JOIN</span> Inventory
                <br/>&emsp;<span className="keyword">ON</span> Listing.ITEM_ID = Inventory.ITEM_ID 
                <br/><span className="keyword">LEFT JOIN</span> Users
                <br/>&emsp;<span className="keyword">ON</span> Users.USER_ID = Listing.USER_ID
                <br/><span className="keyword">WHERE</span> ITEM_NAME <span className="keyword">LIKE</span> "%<span className="input">Mo</span>%" <span className="keyword">AND</span> Listing.IS_AVAILABLE = 1
            </p>
        ),
        'select-cart': (
            <p>
                <span className="keyword">SELECT</span> TRANSACTION_ID, BUYER_ID, TRANS_COST,
                <br/>&emsp;Listing.LISTING_ID, ITEM_QUANTITY, ITEM_NAME, ITEM_CATEGORY,
                <br/>&emsp;USER_FNAME, Inventory.ITEM_STOCK
                <br/><span className="keyword">FROM</span> Transaction
                <br/><span className="keyword">LEFT JOIN</span> Listing
                <br/>&emsp;<span className="keyword">ON</span> Transaction.LISTING_ID = Listing.LISTING_ID 
                <br/><span className="keyword">LEFT JOIN</span> Inventory
                <br/>&emsp;<span className="keyword">ON</span> Listing.ITEM_ID = Inventory.ITEM_ID 
                <br/><span className="keyword">LEFT JOIN</span> Users
                <br/>&emsp;<span className="keyword">ON</span> Listing.USER_ID = Users.USER_ID
                <br/><span className="keyword">WHERE</span> BUYER_ID = <span className="input">3</span> <span className="keyword">AND</span> SHIPMENT_ID IS NULL
            </p>
        ),
        'insert-cart': (
            <div>
                <p>
                    <span className="keyword">SELECT</span> ITEM_STOCK <span className="keyword">FROM</span> Inventory <span className="keyword">WHERE</span> ITEM_ID = <span className="input">2002</span>
                </p>
                <hr/>
                <p>
                    <span className="keyword">INSERT INTO</span> Transaction (BUYER_ID, TRANS_COST, LISTING_ID, ITEM_QUANTITY)
                    <br/><span className="keyword">VALUES</span> (
                        <br/>&emsp;<span className="input">3</span>,
                        <br/>&emsp;<span className="sub-query">(SELECT ITEM_COST FROM Listing WHERE LISTING_ID = <span className="input">4009</span>)</span>,
                        <br/>&emsp;<span className="input">4009</span>,
                        <br/>&emsp;1
                    <br/>)
                </p>
            </div>
        ),
        'select-shipments': (
            <p>
                <span className="keyword">SELECT</span> BUYER_ID, ITEM_CATEGORY, ITEM_NAME, TRANS_COST,
                <br/>&emsp;SHIPMENT_PRICE, USER_FNAME, SHIPMENT_ADDRESS, Shipments.SHIPMENT_ID,
                <br/>&emsp;ITEM_QUANTITY, DATE_CREATED, DELIVERY_DATE
                <br/><span className="keyword">FROM</span> Shipments
                <br/><span className="keyword">INNER JOIN</span> Transaction
                <br/>&emsp;<span className="keyword">ON</span> Transaction.SHIPMENT_ID = Shipments.SHIPMENT_ID
                <br/><span className="keyword">LEFT JOIN</span> Listing
                <br/>&emsp;<span className="keyword">ON</span> Transaction.LISTING_ID = Listing.LISTING_ID  
                <br/><span className="keyword">LEFT JOIN</span> Inventory
                <br/>&emsp;<span className="keyword">ON</span> Listing.ITEM_ID = Inventory.ITEM_ID
                <br/><span className="keyword">LEFT JOIN</span> Users
                <br/>&emsp;<span className="keyword">ON</span> Listing.USER_ID = Users.USER_ID
                <br/><span className="keyword">WHERE</span> BUYER_ID = <span className="input">3</span>
            </p>
        ),
    };

    return (
        <div className="sql-popup">
            {queries[props.query]}
        </div>
    );
}