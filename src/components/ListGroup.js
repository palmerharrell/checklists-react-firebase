import React from "react";
import List from "./List";

class ListGroup extends React.Component {
    createList = () => {
        this.props.displayModal("addingList");
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
                            <button disabled={activeList == null}>
                                Rename List
                            </button>
                        </span>
                        <button
                            className="btn-delete-list"
                            onClick={this.props.deleteList}
                            // == is true here for both null and undefined
                            // === would not catch undefined
                            disabled={activeList == null}
                        >
                            Delete List
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
export default ListGroup;
