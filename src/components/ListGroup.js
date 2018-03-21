import React from "react";

class ListGroup extends React.Component {
    createList = () => {
        const list = {
            name: "",
            items: {}
        };
        this.props.addList(list);
    };

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
                <button onClick={this.createList}>Add List</button>
            </div>
        );
    }
}
export default ListGroup;
