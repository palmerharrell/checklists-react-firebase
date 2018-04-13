import React from "react";

class EditListsDialog extends React.Component {
    render() {
        return (
            <div className="backdrop">
                <div id="list-dialog">
                    <span className="cancel" onClick={this.props.editList}>
                        &times;
                    </span>
                    <p id="list-dialog-title">{this.props.title}</p>
                    <input
                        type="text"
                        name="text-input"
                        onKeyPress={this.props.editList}
                        defaultValue={this.props.placeholder}
                        autoFocus
                    />
                    <button name="edit" onClick={this.props.editList}>
                        {this.props.editType}
                    </button>
                </div>
            </div>
        );
    }
}

export default EditListsDialog;
