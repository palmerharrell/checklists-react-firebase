import React from "react";
import List from "./List";

class MobileListGroup extends React.Component {
    createList = () => {
        this.props.displayModal("addingList");
    };

    renameList = () => {
        this.props.displayModal("renamingList");
    };

    deleteList = () => {
        this.props.displayModal("deletingList");
    };

    render() {
        const { activeList, lists } = this.props.listState;
        return (
            <div id="mlists">
                <ul id="list-names">
                    {activeList !== undefined && lists !== undefined
                        ? Object.keys(lists).map(key => (
                              <List
                                  value={`${lists[key].name}`}
                                  active={key === activeList}
                                  key={key}
                                  index={key}
                                  setActiveList={this.props.setActiveList}
                              />
                          ))
                        : null}
                </ul>
                <div id="list-buttons">
                    <div id="btngrp-new-list">
                        <button onClick={this.createList}>New List</button>
                    </div>
                    <div id="btngrp-edit-list">
                        <span id="btn-rename-list">
                            <button
                                onClick={this.renameList}
                                disabled={activeList == null}
                            >
                                Rename List
                            </button>
                        </span>
                        <button
                            id="btn-delete-list"
                            onClick={this.deleteList}
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
export default MobileListGroup;
