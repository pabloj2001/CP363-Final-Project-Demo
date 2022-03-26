export function SqlPopup(props){
    const queries = {
        'select-items': (
            <p>
                <span className="keyword">SELECT</span> Listing.LISTING_ID, USER_FNAME, Inventory.*, Listing.ITEM_COST,
                    (SELECT COUNT(*) FROM Transaction WHERE Listing.LISTING_ID = Transaction.LISTING_ID AND BUYER_ID = 3) &gt; 0 AS CART_ADDED
                <span className="keyword">FROM</span> Listing
                <span className="keyword">LEFT JOIN</span> Inventory
                    <span className="keyword">ON</span> Listing.ITEM_ID = Inventory.ITEM_ID 
                <span className="keyword">LEFT JOIN</span> Users
                    <span className="keyword">ON</span> Users.USER_ID = Listing.USER_ID
            </p>
        ),
    };

    return (
        <div className="sql-popup">
            {queries[props.query]}
        </div>
    );
}