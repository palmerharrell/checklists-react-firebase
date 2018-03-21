import React from "react";

const Item = props => (
    <li className="item">
        <input type="checkbox" />
        <input className="item-input" type="text" value={props.value} />
    </li>
);

export default Item;
