import React from "react";

const List = props => (
    <li
        className={(
            "list-name " + (props.active ? "selected-list" : "")
        ).trim()}
    >
        {props.value}
    </li>
);
export default List;
