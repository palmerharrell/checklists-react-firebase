import React from "react";
import Item from "./Item";

class ItemGroup extends React.Component {
    createItem = () => {
        this.props.addItem(this.props.listId);
    };

    renderItems = key => {
        const items = this.props.items;
        return (
            <Item
                value={`${items[key].text}`}
                checked={items[key].checked}
                key={key}
                cbkey={`cb${key}`}
                txtkey={`txt${key}`}
            />
        );
    };

    render() {
        const items = this.props.items;
        return (
            <div id="details">
                <ul id="list-items">
                    {/* Render unchecked items */}
                    {Object.keys(items)
                        .filter(key => items[key].checked === false)
                        .map(key => this.renderItems(key))}

                    {/* Render checked items */}
                    {Object.keys(items)
                        .filter(key => items[key].checked === true)
                        .map(key => this.renderItems(key))}
                </ul>
                <div id="add-item">
                    <button onClick={this.createItem}>Add Item</button>
                </div>
            </div>
        );
    }
}

export default ItemGroup;

// NOTE: How items were rendered without regard
//       for checked status:

// Object.keys(items).map(key => (
//     <Item
//         value={`${items[key].text}`}
//         checked={items[key].checked}
//         key={key}
//         cbkey={`cb${key}`}
//         txtkey={`txt${key}`}
//     />
// ));
