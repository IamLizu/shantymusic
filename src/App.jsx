import React from "react";
import Login from "./components/Login";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import RegisterLabel from "./components/label/Register";
import RegisterListener from "./components/listener/account/Register";
import Dashboard from "./components/Dashboard";
import ProtectedRoute from "./routeProtection";
import EmailVerify from "./components/EmailVerify";
import ResetPassword from "./components/ResetPassword";
import Account from "./components/listener/account/Account";
import ChangePassword from "./components/ChangePassword";
import EditProfile from "./components/listener/account/EditProfile";
import Playlist from "./components/listener/playlist/Playlist";
import Subscriptions from "./components/Subscriptions";
import Logout from "./components/Logout";
import Search from "./components/Search";

function App() {
    return (
        <>
            <Router>
                <Switch>
                    <Route exact path="/" component={Login} />
                    <ProtectedRoute exact path="/logout" component={Logout} />
                    <ProtectedRoute exact path="/search" component={Search} />
                    <Route
                        exact
                        path="/reset-password"
                        component={ResetPassword}
                    />
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
                    <ProtectedRoute exact path="/account" component={Account} />
                    <ProtectedRoute
                        exact
                        path="/account/change-password"
                        component={ChangePassword}
                    />
                    <ProtectedRoute
                        exact
                        path="/account/edit"
                        component={EditProfile}
                    />
                    <ProtectedRoute
                        exact
                        path="/playlist/:id"
                        component={Playlist}
                    />
                    <ProtectedRoute
                        exact
                        path="/subscriptions"
                        component={Subscriptions}
                    />
                    <Route exact path="/verify" component={EmailVerify} />
                </Switch>
            </Router>
        </>
    );
}

export default App;
