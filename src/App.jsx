import React from "react";
import Login from "./components/Login";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";

function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route
                        exact
                        path={process.env.PUBLIC_URL + "/login"}
                        component={Login}
                    />
                    <Route
                        exact
                        path={process.env.PUBLIC_URL + "/register"}
                        component={Register}
                    />
                    <Route
                        exact
                        path={process.env.PUBLIC_URL + "/dashboard"}
                        component={Dashboard}
                    />
                </Switch>
            </Router>
        </>
    );
}

export default App;
