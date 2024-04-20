import { JWTPayload } from "jose";
import * as utils from "./utils";
import { PropsWithChildren, createContext, useCallback, useState } from "react";

type AuthContextProps = {
    auth: JWTPayload | null;
    makeLoginUrl: () => string;
    login: (
        accessToken: string,
        idToken: string,
        state: string
    ) => JWTPayload | null;
    logout: () => void;
};

const initContextData: AuthContextProps = {
    auth: null,
    makeLoginUrl: utils.makeLoginUrl,
    login: (accessToken: string, idToken: string, state: string) => { return null },
    logout() { },
}

export const AuthContext = createContext(initContextData);

export const AuthProvider = (props: PropsWithChildren) => {
    const makeLogin = useCallback((accessToken: string,
        idToken: string,
        state: string) => {
        const authData = utils.login(accessToken, idToken, state);

        setData((oldData) => ({
            auth: authData,
            makeLoginUrl: oldData.makeLoginUrl,
            login: oldData.login,
            logout: oldData.logout,
        }));
        return authData;
    }, []);

    const [data, setData] = useState({
        auth: utils.getAuth(),
        makeLoginUrl: utils.makeLoginUrl,
        login: makeLogin,
        logout: () => { }
    });

    return (
        <AuthContext.Provider value={data}>{props.children}</AuthContext.Provider>
    )
};



