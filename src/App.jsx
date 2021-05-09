import React from "react";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/login" component={Login} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
