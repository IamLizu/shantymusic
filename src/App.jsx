import React from "react";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./routeProtection";

function App() {
    return (
        <>
            <Router basename="/shantymusic">
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <ProtectedRoute
                        exact
                        path="/dashboard"
                        component={Dashboard}
                    />
                </Switch>
            </Router>
        </>
    );
}

export default App;
