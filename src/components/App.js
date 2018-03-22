import React, { Fragment } from "react";
import Header from "./Header";
import ListGroup from "./ListGroup";
import ItemGroup from "./ItemGroup";
import sampleLists from "../sample-data";

class App extends React.Component {
    // this.state.lists[activeList].items does not exist without a dummy
    // list in state, so ItemGroup throws an error when it tries to render
    // There's probably a better way to handle this.
    state = {
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
    };

    // TODO: Should be able to make it work with this initial state
    // state = {
    //     activeList: "",
    //     lists: {}
    // };

    componentDidMount() {
        const { params } = this.props.match;
        if (params.listsId === "demo") {
            this.loadSampleLists();
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
            activeList: sampleLists.activeList,
            lists: sampleLists.lists
        });
    };

    addList = list => {
        // Copy existing state
        const lists = { ...this.state.lists };
        // Add new list to copy of state
        lists[`list${Date.now()}`] = list;
        // Set new lists object to state
        this.setState({
            lists
        });
    };

    addItem = key => {
        const lists = { ...this.state.lists };
        lists[key].items[`item${Date.now()}`] = {
            text: "",
            checked: false
        };
        this.setState({
            lists
        });
    };

    render() {
        const activeList = this.state.activeList;
        const activeListItems = this.state.lists[activeList].items;
        return (
            <Fragment>
                <Header headerText="CheckLists" />
                <div id="content">
                    <ListGroup addList={this.addList} listState={this.state} />
                    <ItemGroup
                        addItem={this.addItem}
                        items={activeListItems}
                        listId={activeList}
                    />
                </div>
            </Fragment>
        );
    }
}

export default App;
