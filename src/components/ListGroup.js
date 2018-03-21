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
        const { activeList, lists } = this.props.listState;

        return (
            <div id="lists">
                <ul className="list-names">
                    {Object.keys(lists).map(key => (
                        <List
                            value={`${lists[key].name}`}
                            active={key === activeList ? true : false}
                            key={key}
                        />
                    ))}
                </ul>
                <button onClick={this.createList}>Add List</button>
            </div>
        );
    }
}
export default ListGroup;
