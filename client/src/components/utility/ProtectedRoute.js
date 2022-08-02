import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({user}) => {
    console.log(user);

    if(user) {
        return <Outlet />;
    } else {
        return <Navigate to="/login" />;
    }
}

export default ProtectedRoute;