import React from "react";

class Item extends React.Component {
    handleTextChange = e => {
        const updatedItem = {
            text: e.currentTarget.value,
            checked: this.props.checked
        };
        this.props.updateItem(this.props.index, this.props.listId, updatedItem);
    };

    handleCheckboxChange = e => {
        const updatedItem = {
            text: this.props.value,
            checked: e.currentTarget.checked
        };
        this.props.updateItem(this.props.index, this.props.listId, updatedItem);
    };

    handleDelete = () => {
        this.props.deleteItem(this.props.index, this.props.listId);
    };

    render() {
        return (
            <li className="item">
                <input
                    type="checkbox"
                    checked={this.props.checked}
                    onChange={this.handleCheckboxChange}
                />
                <input
                    className="item-input"
                    type="text"
                    value={this.props.value}
                    onChange={this.handleTextChange}
                    autoFocus={this.props.value === ""}
                />
                <span className="delete" onClick={this.handleDelete}>
                    &times;
                </span>
            </li>
        );
    }
}

export default Item;
