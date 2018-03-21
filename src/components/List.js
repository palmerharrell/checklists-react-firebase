import React from "react";
import Item from "./Item";

class List extends React.Component {
    createItem = () => {
        const item = {
            text: "Cheese",
            listId: "abcd1234",
            checked: false
        };
        this.props.addItem(item);
    };

    render() {
        return (
            <div id="details">
                <ul id="list-items">
                    <Item value="eggs" />
                    <Item value="bread" />
                    <Item value="milk" />
                    <Item value="Flour" />
                    <Item value="Salt" />
                    <Item value="Pepper" />
                    <Item value="Butter" />
                </ul>
                <div id="add-item">
                    <button onClick={this.createItem}>Add Item</button>
                </div>
            </div>
        );
    }
}

export default List;
