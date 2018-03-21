import React from "react";

const Item = props => (
    <li className="item">
        <input type="checkbox" checked={props.checked} key={props.cbkey} />
        <input
            className="item-input"
            type="text"
            value={props.value}
            key={props.txtkey}
        />
    </li>
);

export default Item;
