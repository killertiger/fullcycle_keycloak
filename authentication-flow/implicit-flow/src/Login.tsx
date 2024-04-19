import { Navigate } from "react-router-dom";
import { makeLoginUrl } from "./utils";
import { useEffect } from "react";

export function Login() {
    const authContext = {
        auth: false
    };

    useEffect(() => {
        if (!authContext.auth) {
            window.location.href = makeLoginUrl();
        }
    }, [authContext]);

    return authContext.auth ? <Navigate to="/admin" /> :
     (
        <div>
            Loading...
        </div>
    );
}