import { PropsWithChildren, useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "./AuthProvider";

export function PrivateRoute(props: PropsWithChildren) {
    const { auth } = useContext(AuthContext);

    if (!auth) {
        return <Navigate to="/login" />
    }

    return props.children;
}