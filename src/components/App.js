import React, { Fragment } from "react";
import Header from "./Header";
import ListGroup from "./ListGroup";
import ItemGroup from "./ItemGroup";
import sampleLists from "../sample-data";

class App extends React.Component {
    state = {
        lists: {}
    };

    componentDidMount() {
        const { params } = this.props.match;
        if (params.listsId === "demo") {
            this.loadSampleLists();
        }
    }

    loadSampleLists = () => {
        this.setState({ lists: sampleLists });
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

    // TODO: This is padded to ItemGroup. It will need to provide
    //  the listId for the currently active list
    //  *** (or store active list in state?) ***
    addItem = item => {
        console.log("Adding item to list");
        console.log(item);
    };

    render() {
        return (
            <Fragment>
                <Header headerText="CheckLists" />
                <div id="content">
                    <ListGroup addList={this.addList} />
                    <ItemGroup addItem={this.addItem} />
                </div>
            </Fragment>
        );
    }
}

export default App;
