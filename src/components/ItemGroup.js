import React from "react";
import Item from "./Item";

class ItemGroup extends React.Component {
    createItem = () => {
        this.props.addItem(this.props.listId);
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
