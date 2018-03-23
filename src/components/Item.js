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
        console.log(e.currentTarget.checked);
        const updatedItem = {
            text: this.props.value,
            checked: e.currentTarget.checked
        };
        this.props.updateItem(this.props.index, this.props.listId, updatedItem);
    };

    render() {
        return (
            <li className="item">
                <input
                    type="checkbox"
                    checked={this.props.checked}
                    key={this.props.cbkey}
                    onChange={this.handleCheckboxChange}
                />
                <input
                    className="item-input"
                    type="text"
                    value={this.props.value}
                    key={this.props.txtkey}
                    onChange={this.handleTextChange}
                />
            </li>
        );
    }
}

export default Item;
