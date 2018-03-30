import React from "react";
import firebase from "firebase";
import base, { firebaseApp } from "../base";

class Login extends React.Component {
    loadDemo = () => {
        this.props.history.push("/lists/demo");
    };

    authHandler = async authData => {
        // Look up entry in Firebase by uid
        const userData = await base.fetch(authData.user.uid, { context: this });
        // If entry doesn't exist in Firebase, create it and set owner
        // (Check for .owner because userData comes back no matter what)
        if (!userData.owner) {
            await base.post(`${authData.user.uid}/owner`, {
                data: authData.user.uid
            });
        }
        return authData.user.uid;
    };

    authenticate = provider => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler)
            .then(uid => {
                this.props.history.push({
                    pathname: `/lists/${uid}`,
                    state: { uid: uid }
                });
            });
    };

    render() {
        return (
            <div id="login">
                <h2>Login with:</h2>
                <button
                    className="login-button"
                    onClick={() => this.authenticate("Github")}
                >
                    GitHub
                </button>
                <button
                    className="login-button"
                    onClick={() => this.authenticate("Twitter")}
                >
                    Twitter
                </button>
                <button
                    className="login-button"
                    onClick={() => this.authenticate("Facebook")}
                >
                    Facebook
                </button>
                <h2>--- OR ---</h2>
                <button className="login-button" onClick={this.loadDemo}>
                    Load Sample Data
                </button>
            </div>
        );
    }
}

export default Login;
