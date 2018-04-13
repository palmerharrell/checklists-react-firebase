import React from "react";

class DeleteListDialog extends React.Component {
    render() {
        return (
            <div className="backdrop">
                <div id="list-dialog">
                    <span className="cancel" onClick={this.props.deleteList}>
                        &times;
                    </span>
                    <p id="list-dialog-title">
                        Delete {this.props.activeList} and all of its items?
                    </p>

                    <button
                        id="delete-no"
                        name="no"
                        onClick={this.props.deleteList}
                    >
                        NO
                    </button>
                    <button
                        id="delete-yes"
                        name="yes"
                        onClick={this.props.deleteList}
                    >
                        YES
                    </button>
                </div>
            </div>
        );
    }
}

export default DeleteListDialog;
