import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Login from "./Login";
import App from "./App";
import NotFound from "./NotFound";

const Router = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Login} />
            <Route exact path="/lists/:listsId" component={App} />
            <Route exact component={NotFound} />
        </Switch>
    </BrowserRouter>
);

export default Router;
