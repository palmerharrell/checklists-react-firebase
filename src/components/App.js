import React, { Fragment } from "react";
import firebase from "firebase";
import Header from "./Header";
import ListGroup from "./ListGroup";
import MobileListGroup from "./MobileListGroup";
import ItemGroup from "./ItemGroup";
import sampleLists from "../sample-data";
import base from "../base";

class App extends React.Component {
    state = {
        listData: {},
        flags: {
            listAdded: false,
            addingList: false,
            renamingList: false,
            deletingList: false,
            showMobileListMenu: false
        },
        uid: "demo",
        owner: null
    };

    constructor(props) {
        super(props);
        // Set owner to listsId in URL
        this.state.owner = this.props.match.params.listsId;
        // Set uid to authorized uid, if it exists
        if (this.props.location.state) {
            this.state.uid = this.props.location.state.uid;
        }
    }

    componentDidMount() {
        const { params } = this.props.match;
        // if (params.listsId === "demo") {
        if (this.state.uid === "demo") {
            this.loadSampleLists();
        } else {
            // Check if user is logged in before syncing with Firebase
            // redirect back to login, if they are not
            if (this.state.uid !== this.state.owner) {
                this.props.history.push("/");
            }
            this.ref = base.syncState(`${params.listsId}/listData`, {
                context: this,
                state: "listData"
            });
        }
    }

    componentDidUpdate() {
        if (this.state.uid !== this.state.owner) {
            this.props.history.push("/");
        }
        if (this.state.flags.listAdded) {
            // Add a new blank item to the new list
            this.addItem(this.state.listData.activeList);
        }
    }

    componentWillUnmount() {
        // If unmounting anything but "demo", since it doesn't use firebase
        if (this.ref) {
            base.removeBinding(this.ref);
        }
    }

    logout = async () => {
        await firebase.auth().signOut();
        this.setState({ uid: null });
    };

    displayModal = modalType => {
        if (typeof modalType === "object") {
            const flags = { ...this.state.flags };
            flags.showMobileListMenu = true;
            this.setState({
                flags
            });
        } else {
            const flags = { ...this.state.flags };
            flags[modalType] = true;
            flags.showMobileListMenu = false;
            this.setState({
                flags
            });
        }
    };

    loadSampleLists = () => {
        this.setState({
            listData: sampleLists.listData
        });
    };

    setActiveList = newActiveList => {
        const listData = { ...this.state.listData };
        const flags = { ...this.state.flags };
        listData.activeList = newActiveList;
        flags.showMobileListMenu = false;
        this.setState({
            listData,
            flags
        });
    };

    addList = e => {
        // If this was called by anything but the cancel button
        if (e.currentTarget.name) {
            // Enter key or Add button. Don't do anything on other keypresses
            if (e.key === "Enter" || e.currentTarget.name === "add") {
                // Get text input value
                const txtValue =
                    e.key === "Enter"
                        ? e.currentTarget.value
                        : e.currentTarget.previousSibling.value;

                if (txtValue !== "") {
                    const list = {
                        name: txtValue,
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
                    flags.listAdded = true;
                    this.setState({
                        listData,
                        flags
                    });
                } else {
                    // Cancel instead of creating a list with no title
                    const flags = { ...this.state.flags };
                    flags.addingList = false;
                    this.setState({
                        flags
                    });
                }
            }
        } else {
            // If name is undefined, this was called by cancel button
            const flags = { ...this.state.flags };
            flags.addingList = false;
            this.setState({
                flags
            });
        }
    };

    renameList = e => {
        // If this was called by anything but the cancel button
        if (e.currentTarget.name) {
            // Enter key or Change button. Don't do anything on other keypresses
            if (e.key === "Enter" || e.currentTarget.name === "change") {
                // Get text input value
                const txtValue =
                    e.key === "Enter"
                        ? e.currentTarget.value
                        : e.currentTarget.previousSibling.value;

                if (txtValue !== "") {
                    // Rename current activeList
                    const listData = { ...this.state.listData };
                    const activeList = this.state.listData.activeList;
                    const flags = { ...this.state.flags };

                    listData.lists[activeList].name = txtValue;
                    flags.renamingList = false;
                    this.setState({
                        listData,
                        flags
                    });
                } else {
                    // Cancel instead of giving list a blank title
                    const flags = { ...this.state.flags };
                    flags.renamingList = false;
                    this.setState({
                        flags
                    });
                }
            }
        } else {
            // If name is undefined, this was called by cancel button
            const flags = { ...this.state.flags };
            flags.renamingList = false;
            this.setState({
                flags
            });
        }
    };

    deleteList = e => {
        if (e.currentTarget.name === "yes") {
            const { params } = this.props.match;
            const flags = { ...this.state.flags };
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
            flags.deletingList = false;
            this.setState({
                listData,
                flags
            });
        } else {
            // Cancel delete list
            const flags = { ...this.state.flags };
            flags.deletingList = false;
            this.setState({
                flags
            });
        }
    };

    addItem = listId => {
        const listData = { ...this.state.listData };
        const flags = { ...this.state.flags };

        if (!listData.lists[listId].items) {
            listData.lists[listId].items = {};
        }
        listData.lists[listId].items[`item${Date.now()}`] = {
            text: "",
            checked: false
        };
        flags.listAdded = false;
        this.setState({
            listData,
            flags
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
        // Check if user is logged in and owns this listData
        // (Not sure if this is necessary since componentDidMount
        // redirects back to login if uid doesn't match owner)
        if (this.state.uid !== this.state.owner) {
            return <p>User ID does not match Owner</p>;
        }

        const listData = this.state.listData;
        let activeList = listData.activeList || "";
        let activeListItems = {};
        if (activeList !== "") {
            // Hack to fix demo crashing after "Groceries" is deleted,
            // logging out, and loading sample data again...
            if (listData.lists[activeList] === undefined) {
                window.location.reload(true);
            }
            // END hack
            activeListItems = listData.lists[activeList].items;
        }
        return (
            <Fragment>
                <Header headerText="CheckLists" />
                {/* New List Dialog */}
                {this.state.flags.addingList ? (
                    <div className="backdrop">
                        <div id="list-dialog">
                            <span className="cancel" onClick={this.addList}>
                                &times;
                            </span>
                            <p id="list-dialog-title">List Name</p>
                            <input
                                type="text"
                                name="text-input"
                                onKeyPress={this.addList}
                                autoFocus
                            />
                            <button name="add" onClick={this.addList}>
                                Add
                            </button>
                        </div>
                    </div>
                ) : null}
                {/* END New List Dialog */}
                {/* Rename List Dialog */}
                {this.state.flags.renamingList ? (
                    <div className="backdrop">
                        <div id="list-dialog">
                            <span className="cancel" onClick={this.renameList}>
                                &times;
                            </span>
                            <p id="list-dialog-title">Rename List</p>
                            <input
                                type="text"
                                name="text-input"
                                onKeyPress={this.renameList}
                                defaultValue={
                                    this.state.listData.lists[
                                        this.state.listData.activeList
                                    ].name
                                }
                                autoFocus
                            />
                            <button name="change" onClick={this.renameList}>
                                Change
                            </button>
                        </div>
                    </div>
                ) : null}
                {/* END Rename List Dialog */}
                {/* Delete List Dialog */}
                {this.state.flags.deletingList ? (
                    <div className="backdrop">
                        <div id="list-dialog">
                            <span className="cancel" onClick={this.deleteList}>
                                &times;
                            </span>
                            <p id="list-dialog-title">
                                Delete {`"${listData.lists[activeList].name}"`}{" "}
                                and all of its items?
                            </p>

                            <button
                                id="delete-no"
                                name="no"
                                onClick={this.deleteList}
                            >
                                NO
                            </button>
                            <button
                                id="delete-yes"
                                name="yes"
                                onClick={this.deleteList}
                            >
                                YES
                            </button>
                        </div>
                    </div>
                ) : null}
                {/* END Delete List Dialog */}
                {/* Mobile List Names Dialog */}
                {this.state.flags.showMobileListMenu ? (
                    <div className="backdrop">
                        <div id="mobile-lists">
                            <MobileListGroup
                                addList={this.addList}
                                displayModal={this.displayModal}
                                setActiveList={this.setActiveList}
                                deleteList={this.deleteList}
                                listState={listData}
                            />
                        </div>
                    </div>
                ) : null}
                {/* END Mobile List Names Dialog */}
                <div id="logout">
                    <button onClick={this.logout}>Logout</button>
                </div>
                <div id="content">
                    <div id="mobile-list-name" onClick={this.displayModal}>
                        <p>
                            {listData.lists && activeList !== ""
                                ? listData.lists[activeList].name + " "
                                : "Add a List "}
                            &#9660;
                            {/* &or; */}
                        </p>
                    </div>
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
