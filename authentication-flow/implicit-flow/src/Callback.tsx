import { useLocation } from "react-router-dom"
import { login } from "./utils";
import { useEffect } from "react";

export function Callback() {
    const { hash } = useLocation();

    useEffect(() => {
        const searchParams = new URLSearchParams(hash.replace("#", ""));

        const accessToken = searchParams.get("access_token") as string;
        const idToken = searchParams.get("id_token") as string;
        const state = searchParams.get("state") as string;

        if (!accessToken || !idToken || !state) {

        }

        login(accessToken, idToken, state);

        console.log("Logged in");
    }, [hash]);

    return (
        <div>
            Loading...
        </div>
    )
}