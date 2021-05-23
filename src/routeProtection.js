import PropTypes from "prop-types";
import React from "react";
import { Route, useHistory } from "react-router-dom";
import Cookies from "js-cookie";

const ProtectedRoute = ({ component: Component, ...rest }) => {
    const authToken = Cookies.get("Jwt-Token");
    const history = useHistory();
    return (
        <Route
            {...rest}
            render={(props) => {
                if (authToken) {
                    return <Component {...props} />;
                } else {
                    history.push("/");
                }
            }}
        />
    );
};

ProtectedRoute.propTypes = {
    component: PropTypes.any,
};

export default ProtectedRoute;
