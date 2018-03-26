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
        return (
            <div id="lists">
                <ul className="list-names">
                    {activeList !== undefined && lists !== undefined
                        ? Object.keys(lists).map(key => (
                              <List
                                  value={`${lists[key].name}`}
                                  active={key === activeList ? true : false}
                                  key={key}
                                  index={key}
                                  setActiveList={this.props.setActiveList}
                              />
                          ))
                        : null}
                </ul>
                <div className="list-buttons">
                    <div className="btngrp-new-list">
                        <button onClick={this.createList}>New List</button>
                    </div>
                    <div className="btngrp-edit-list">
                        <span className="btn-rename-list">
                            <button>Rename List</button>
                        </span>
                        <button className="btn-delete-list">Delete List</button>
                    </div>
                </div>
            </div>
        );
    }
}
export default ListGroup;
