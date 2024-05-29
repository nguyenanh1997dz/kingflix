import React from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const AdminProtectionRouter = () => {
    const { userInfo } = useSelector((state) => state.userLogin);
    if (!userInfo?.token) {
        return <Navigate to="/login" />;
    }
    if (!userInfo.isAdmin) {
        return <Navigate to="/404" />;
    }
    return <Outlet />;
};

const ProtectionRouter = () => {
    const { userInfo } = useSelector((state) => state.userLogin);

    return userInfo?.token ? <Outlet /> : <Navigate to="/login" />;
};

const IsLogin = () => {
    const { userInfo } = useSelector((state) => state.userLogin);

    return userInfo?.token ? <Navigate to="/profile" /> : <Outlet />;
};

export { AdminProtectionRouter, ProtectionRouter, IsLogin };
