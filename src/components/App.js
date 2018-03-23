import React, { Fragment } from "react";
import Header from "./Header";
import ListGroup from "./ListGroup";
import ItemGroup from "./ItemGroup";
import sampleLists from "../sample-data";
import base from "../base";

class App extends React.Component {
    // this.state.lists[activeList].items does not exist without a dummy
    // list in state, so ItemGroup throws an error when it tries to render
    // There's probably a better way to handle this.
    state = {
        listData: {
            activeList: "list1",
            lists: {
                list1: {
                    name: "Test List",
                    items: {
                        item1: {
                            text: "Test Item",
                            checked: false
                        }
                    }
                }
            }
        }
    };

    // TODO: Should be able to make it work with this empty initial state
    //      Try this:
    //      In render(): If state.activeList !== "",
    //      create activeList & activeListItems consts.
    //      Then if activeList(or activeListItems, or just state.activeList?)
    //      const exists, provide items to
    //      ItemGroup props.
    // state = {
    //     activeList: "",
    //     lists: {}
    // };

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

    // NOTE: Trying to figure out why I couldn't access
    //       this.state.lists[activeList].items (it didn't exist yet,
    //       added dummy list & item to initial state for now)
    // componentDidUpdate() {
    //     const activeList = this.state.activeList;
    //     console.log(activeList);
    //     console.log(this.state.lists[activeList].items);
    // }

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
        // Copy existing state
        const listData = { ...this.state.listData };
        // Add new list to copy of state
        listData.lists[`list${Date.now()}`] = list;
        // Set new lists object to state
        this.setState({
            listData
        });
    };

    addItem = key => {
        const listData = { ...this.state.listData };
        listData.lists[key].items[`item${Date.now()}`] = {
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
                        addItem={this.addItem}
                        updateItem={this.updateItem}
                        items={activeListItems}
                        listId={activeList}
                    />
                </div>
            </Fragment>
        );
    }
}

export default App;
