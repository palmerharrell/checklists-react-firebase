import React, { Fragment } from "react";
import Header from "./Header";
import ListGroup from "./ListGroup";
import List from "./List";

class App extends React.Component {
    render() {
        return (
            <Fragment>
                <Header headerText="CheckLists" />
                <div id="content">
                    <ListGroup />
                    <List />
                </div>
            </Fragment>
        );
    }
}

export default App;
