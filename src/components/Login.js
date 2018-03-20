import React from "react";

const Login = props => (
    <div id="login">
        <h2>Login with:</h2>
        <button className="login-button">GitHub</button>
        <button className="login-button">Twitter</button>
        <button className="login-button">Facebook</button>
        <h2>--- OR ---</h2>
        <button className="login-button">Load Sample Data</button>
    </div>
);

export default Login;
