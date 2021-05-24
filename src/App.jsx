import React from "react";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegisterLabel from "./components/label/Register";
import RegisterListener from "./components/listener/Register";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./routeProtection";
import EmailVerify from "./components/EmailVerify";

function App() {
    return (
        <>
            <Router basename="/shantymusic">
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route
                        exact
                        path="/register/label"
                        component={RegisterLabel}
                    />
                    <Route
                        exact
                        path="/register/listener"
                        component={RegisterListener}
                    />
                    <ProtectedRoute
                        exact
                        path="/dashboard"
                        component={Dashboard}
                    />
                    <Route exact path="/verify" component={EmailVerify} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
