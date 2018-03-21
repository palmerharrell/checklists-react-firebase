import React from "react";
import Item from "./Item";

class ItemGroup extends React.Component {
    // TODO: create and add item typed in input
    createItem = () => {
        const item = {
            text: "Cheese",
            listId: "abcd1234",
            checked: false
        };
        this.props.addItem(item);
    };

    render() {
        const items = this.props.items;

        return (
            <div id="details">
                <ul id="list-items">
                    {Object.keys(items).map(key => (
                        <Item
                            value={`${items[key].text}`}
                            checked={items[key].checked}
                            key={key}
                            cbkey={`cb${key}`}
                            txtkey={`txt${key}`}
                        />
                    ))}
                </ul>
                <div id="add-item">
                    <button onClick={this.createItem}>Add Item</button>
                </div>
            </div>
        );
    }
}

export default ItemGroup;
