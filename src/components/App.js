import React, { Fragment } from "react";
import Header from "./Header";
import ListGroup from "./ListGroup";
import ItemGroup from "./ItemGroup";
import sampleLists from "../sample-data";
import base from "../base";

class App extends React.Component {
    state = {
        listData: {}
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

    // TODO: addList
    addList = list => {
        const listData = { ...this.state.listData };
        if (!listData.lists) {
            listData.lists = {};
        }
        const newListKey = `list${Date.now()}`;
        listData.lists[newListKey] = list;
        listData.activeList = newListKey;
        this.setState({
            listData
        });
    };

    // TODO: deleteList
    deleteList = listId => {
        console.log("listId: " + listId);
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
                        setActiveList={this.setActiveList}
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
