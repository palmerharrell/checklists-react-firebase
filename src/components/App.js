import React, { Fragment } from "react";
import Header from "./Header";
import ListGroup from "./ListGroup";
import ItemGroup from "./ItemGroup";
import sampleLists from "../sample-data";
import base from "../base";

class App extends React.Component {
    state = {
        listData: {},
        flags: {
            addingList: false,
            renamingList: false
        }
    };

    componentDidMount() {
        const { params } = this.props.match;
        if (params.listsId === "demo") {
            this.loadSampleLists();
        } else {
            this.ref = base.syncState(`${params.listsId}/listData`, {
                context: this,
                state: "listData"
            });
        }
    }

    componentWillUnmount() {
        // If unmounting anything but "demo", since it doesn't use firebase
        if (this.ref) {
            base.removeBinding(this.ref);
        }
    }

    displayModal = modalType => {
        const flags = { ...this.state.flags };
        flags[modalType] = true;
        this.setState({
            flags
        });
    };

    loadSampleLists = () => {
        this.setState({
            listData: sampleLists.listData
        });
    };

    setActiveList = newActiveList => {
        const listData = { ...this.state.listData };
        listData.activeList = newActiveList;
        this.setState({
            listData
        });
    };

    // TODO: addList: change this to only run on clicking Add button
    addList = e => {
        if (e.key === "Enter") {
            const list = {
                name: e.currentTarget.value,
                items: {}
            };

            const listData = { ...this.state.listData };
            const flags = { ...this.state.flags };
            if (!listData.lists) {
                listData.lists = {};
            }
            const newListKey = `list${Date.now()}`;
            listData.lists[newListKey] = list;
            listData.activeList = newListKey;
            flags.addingList = false;
            this.setState({
                listData,
                flags
            });
        }
    };

    // TODO: Ask if user really wants to delete list and all of its items
    deleteList = () => {
        const { params } = this.props.match;
        const listData = { ...this.state.listData };
        const activeList = this.state.listData.activeList;

        // Find first list that doesn't match activeList and set to activeList
        const newActiveList = Object.keys(listData.lists).find(key => {
            return key !== activeList;
        });

        // Delete from state if local, set to null if on Firebase
        if (params.listsId === "demo") {
            delete listData.lists[activeList];
        } else {
            listData.lists[activeList] = null;
        }
        // If only remaining list was deleted, set activeList to null
        listData.activeList = newActiveList || null;
        this.setState({
            listData
        });
    };

    // TODO: renameList
    renameList = () => {
        // rename list
    };

    addItem = listId => {
        const listData = { ...this.state.listData };

        if (!listData.lists[listId].items) {
            listData.lists[listId].items = {};
        }
        listData.lists[listId].items[`item${Date.now()}`] = {
            text: "",
            checked: false
        };
        this.setState({
            listData
        });
    };

    updateItem = (key, listId, updatedItem) => {
        const listData = { ...this.state.listData };
        listData.lists[listId].items[key] = updatedItem;
        this.setState({
            listData
        });
    };

    deleteItem = (key, listId) => {
        const { params } = this.props.match;
        const listData = { ...this.state.listData };

        // Delete from state if local, set to null if on Firebase
        if (params.listsId === "demo") {
            delete listData.lists[listId].items[key];
        } else {
            listData.lists[listId].items[key] = null;
        }
        this.setState({
            listData
        });
    };

    render() {
        if (this.state.flags.addingList) {
            return (
                <Fragment>
                    <Header headerText="CheckLists" />
                    <div id="new-list-dialog" className="">
                        {/* TODO: Add a X to cancel */}
                        <p>List Name</p>
                        <input
                            type="text"
                            name="new-list"
                            id="new-list-input"
                            onKeyPress={this.addList}
                            autoFocus
                        />
                        <button>Add</button>
                    </div>
                </Fragment>
            );
        }
        const listData = this.state.listData;
        const activeList = listData.activeList || "";
        let activeListItems = {};
        if (activeList !== "") {
            activeListItems = listData.lists[activeList].items;
        }
        return (
            <Fragment>
                <Header headerText="CheckLists" />
                <div id="content">
                    <ListGroup
                        addList={this.addList}
                        displayModal={this.displayModal}
                        setActiveList={this.setActiveList}
                        deleteList={this.deleteList}
                        listState={listData}
                    />
                    <ItemGroup
                        items={activeListItems}
                        listId={activeList}
                        addItem={this.addItem}
                        updateItem={this.updateItem}
                        deleteItem={this.deleteItem}
                    />
                </div>
            </Fragment>
        );
    }
}

export default App;
