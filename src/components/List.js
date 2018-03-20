import React from "react";

const List = props => (
    <div id="details">
        <ul id="list-items">
            <li className="item">
                <input type="checkbox" />
                <input className="item-input" type="text" value="Eggs" />
            </li>
            <li className="item">
                <input type="checkbox" />
                <input className="item-input" type="text" value="Milk" />
            </li>
            <li className="item">
                <input type="checkbox" />
                <input className="item-input" type="text" value="Bread" />
            </li>
            <li className="item">
                <input type="checkbox" />
                <input className="item-input" type="text" value="Flour" />
            </li>
            <li className="item">
                <input type="checkbox" />
                <input className="item-input" type="text" value="Salt" />
            </li>
            <li className="item">
                <input type="checkbox" />
                <input className="item-input" type="text" value="Pepper" />
            </li>
            <li className="item">
                <input type="checkbox" />
                <input className="item-input" type="text" value="Butter" />
            </li>
            <li className="item">
                <input type="checkbox" />
                <input className="item-input" type="text" value="Sugar" />
            </li>
        </ul>
        <div id="add-item">
            <button>Add Item</button>
        </div>
    </div>
);

export default List;
