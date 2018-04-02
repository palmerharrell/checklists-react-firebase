import React from "react";

class List extends React.Component {
    changeActiveList = () => {
        this.props.setActiveList(this.props.index);
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
