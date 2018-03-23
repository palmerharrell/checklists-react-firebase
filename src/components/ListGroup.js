import React from "react";
import List from "./List";

class ListGroup extends React.Component {
    //TODO: createList: ask for name of new list?
    createList = () => {
        const list = {
            name: "New List",
            items: {}
        };
        this.props.addList(list);
    };

    render() {
        const { activeList, lists } = this.props.listState;
        console.log("ListGroup activeList: " + activeList);
        console.log("ListGroup lists: " + lists);
        return (
            <div id="lists">
                <ul className="list-names">
                    {activeList !== undefined && lists !== undefined
                        ? Object.keys(lists).map(key => (
                              <List
                                  value={`${lists[key].name}`}
                                  active={key === activeList ? true : false}
                                  key={key}
                                  setActiveList={this.props.setActiveList}
                              />
                          ))
                        : null}
                </ul>
                <button onClick={this.createList}>Add List</button>
            </div>
        );
    }
}
export default ListGroup;
