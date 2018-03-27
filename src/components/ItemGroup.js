import React from "react";
import Item from "./Item";

class ItemGroup extends React.Component {
    createItem = () => {
        this.props.addItem(this.props.listId);
    };

    renderItems = key => {
        const items = this.props.items;
        if (items[key]) {
            return (
                <Item
                    value={`${items[key].text}`}
                    checked={items[key].checked}
                    key={key}
                    index={key}
                    listId={this.props.listId}
                    // cbkey={`cb${key}`}
                    // txtkey={`txt${key}`}
                    updateItem={this.props.updateItem}
                    deleteItem={this.props.deleteItem}
                />
            );
        } else {
            return null;
        }
    };

    render() {
        const items = this.props.items;
        if (!items || Object.keys(items).length === 0) {
            return (
                <div id="details">
                    <div id="add-item">
                        <button
                            onClick={this.createItem}
                            className="lonely"
                            disabled={this.props.listId === ""}
                        >
                            Add Item
                        </button>
                    </div>
                </div>
            );
        }
        return (
            <div id="details">
                <ul id="list-items">
                    {Object.keys(items).map(this.renderItems)}
                </ul>
                <div id="add-item">
                    <button onClick={this.createItem}>Add Item</button>
                </div>
            </div>
        );
    }
}

export default ItemGroup;

// NOTE: Rendering unchecked before checked items (sorting is bad though):

// {/* Render unchecked items */}
// {Object.keys(items)
//     .filter(key => items[key].checked === false)
//     .map(key => this.renderItems(key))}

// {/* Render checked items */}
// {Object.keys(items)
//     .filter(key => items[key].checked === true)
//     .map(key => this.renderItems(key))}
