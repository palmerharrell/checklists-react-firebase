import React from "react";
import firebase from "firebase";
import base, { firebaseApp } from "../base";

class Login extends React.Component {
    // From example, might not belong here!
    state = {
        uid: null,
        owner: null
    };

    loadDemo = () => {
        this.props.history.push("/lists/demo");
    };

    // TODO: Figure out what authHandler should do here
    //       and where this code should really go.
    //       Some of these variable names probably don't make sense either.
    authHandler = async authData => {
        //      This will probably need to redirect to
        //      /lists/someUniqueName instead of doing all this.
        //      * Use uathData.user.uid *
        // 1. Look up current store in firebase database
        const userListData = await base.fetch(this.props.userListId, {
            context: this
        });
        console.log(userListData);
        // 2. Claim it if there is no owner
        if (!userListData.owner) {
            // save it as this user
            await base.post(`${this.props.userListId}/owner`, {
                data: authData.user.uid
            });
        }
        // 3. Set the state of the inventory component to reflect the current user
        //      This state is local to this component
        //      (don't know if this is how I will need to do it):
        this.setState({
            uid: authData.user.uid,
            owner: userListData.owner || authData.user.uid
        });
        console.log(authData);
    };

    authenticate = provider => {
        const authProvider = new firebase.auth[`${provider}AuthProvider`]();
        firebaseApp
            .auth()
            .signInWithPopup(authProvider)
            .then(this.authHandler);
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
