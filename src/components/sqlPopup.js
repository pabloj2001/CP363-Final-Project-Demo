export function SqlPopup(props){
    const queries = {
        'select-items': (
            <p>
                <span className="keyword">SELECT</span> Listing.LISTING_ID, USER_FNAME, Inventory.*, Listing.ITEM_COST,
                <br/>&emsp;<span className="sub-query">(SELECT COUNT(*) FROM Transaction WHERE
                <br/>&emsp;Listing.LISTING_ID = Transaction.LISTING_ID AND BUYER_ID = <span className="input">3</span>)</span> &gt; 0
                <br/>&emsp;<span className="keyword">AS</span> CART_ADDED
                <br/><span className="keyword">FROM</span> Listing
                <br/><span className="keyword">LEFT JOIN</span> Inventory
                <br/>&emsp;<span className="keyword">ON</span> Listing.ITEM_ID = Inventory.ITEM_ID 
                <br/><span className="keyword">LEFT JOIN</span> Users
                <br/>&emsp;<span className="keyword">ON</span> Users.USER_ID = Listing.USER_ID
                <br/><span className="keyword">WHERE</span> Listing.USER_ID IS NOT NULL AND Listing.IS_AVAILABLE = 1
            </p>
        ),
        'select-cart': (
            <p>
                <span className="keyword">SELECT</span> TRANSACTION_ID, BUYER_ID, TRANS_COST, Listing.LISTING_ID,
                <br/>&emsp;ITEM_QUANTITY, ITEM_COST, ITEM_NAME, ITEM_CATEGORY,
                <br/>&emsp;USER_FNAME, Inventory.ITEM_STOCK
                <br/><span className="keyword">FROM</span> Transaction
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