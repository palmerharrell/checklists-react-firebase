import React from "react";

class ListGroup extends React.Component {
    render() {
        return (
            <div id="lists">
                <ul className="list-names">
                    <li className="name">Movies</li>
                    <li className="name example">Groceries</li>
                    <li className="name">Music</li>
                    <li className="name">Gifts</li>
                    <li className="name">Wishlist</li>
                </ul>
            </div>
        );
    }
}

export default ListGroup;