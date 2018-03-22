import React from "react";

class List extends React.Component {
    // TODO: handle events (this works differently in React, see ref video?)
    changeActiveList = e => {
        console.log(e);
        this.props.setActiveList("list4");
    };

    render() {
        return (
            <li
                className={(
                    "list-name " + (this.props.active ? "selected-list" : "")
                ).trim()}
                onClick={this.changeActiveList}
            >
                {this.props.value}
            </li>
        );
    }
}
export default List;
