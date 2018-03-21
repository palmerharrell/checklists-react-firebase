import React from "react";
import List from "./List";

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
                    <List value="Movies" active={false} />
                    <List value="Groceries" active={true} />
                    <List value="Music" active={false} />
                    <List value="Gifts" active={false} />
                    <List value="Wishlist" active={false} />
                </ul>
                <button onClick={this.createList}>Add List</button>
            </div>
        );
    }
}
export default ListGroup;
