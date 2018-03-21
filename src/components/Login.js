import React from "react";

class Login extends React.Component {
    loadDemo = () => {
        this.props.history.push("/lists/demo");
    };

    render() {
        return (
            <div id="login">
                <h2>Login with:</h2>
                <button className="login-button">GitHub</button>
                <button className="login-button">Twitter</button>
                <button className="login-button">Facebook</button>
                <h2>--- OR ---</h2>
                <button className="login-button" onClick={this.loadDemo}>
                    Load Sample Data
                </button>
            </div>
        );
    }
}

export default Login;
