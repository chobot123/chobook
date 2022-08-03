import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PublicRoute = ({user}) => {

    if(user) {
        return <Navigate to="/home" replace />
    } else {
        return <Outlet />;
    }
}

export default PublicRoute;