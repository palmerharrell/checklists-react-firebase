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
                    {/* NOTE: How it was done without regard for checked status: */}
                    {/* {Object.keys(items).map(key => (
                        <Item
                            value={`${items[key].text}`}
                            checked={items[key].checked}
                            key={key}
                            cbkey={`cb${key}`}
                            txtkey={`txt${key}`}
                        />
                    ))} */}

                    {/* NOTE: Map over unchecked items, then checked items.
                        This should probably use filter instead of if/else
                        and be combined into one renderItems method that
                        could be called once for unchecked items and once
                        for checked items.
                    */}

                    {/* Render unchecked items */}
                    {Object.keys(items).map(key => {
                        if (!items[key].checked) {
                            return (
                                <Item
                                    value={`${items[key].text}`}
                                    checked={items[key].checked}
                                    key={key}
                                    cbkey={`cb${key}`}
                                    txtkey={`txt${key}`}
                                />
                            );
                        } else {
                            return null;
                        }
                    })}

                    {/* Render checked items */}
                    {Object.keys(items).map(key => {
                        if (items[key].checked) {
                            return (
                                <Item
                                    value={`${items[key].text}`}
                                    checked={items[key].checked}
                                    key={key}
                                    cbkey={`cb${key}`}
                                    txtkey={`txt${key}`}
                                />
                            );
                        } else {
                            return null;
                        }
                    })}
                </ul>
                <div id="add-item">
                    <button onClick={this.createItem}>Add Item</button>
                </div>
            </div>
        );
    }
}

export default ItemGroup;
