import {useRouter} from "next/router";
import React from "react";
import {useAuth} from "../context/AuthContext";
import {withNavbar} from "./withNavbar";

export function withPublic(Component) {
    return function WithPublic(props) {

        const auth = useAuth();
        const router = useRouter();
        const isAuthenticated = auth.currentUser;

        if (isAuthenticated) {
            router.replace("/home");
            return null;
        } else {
            return <Component {...props}/>
        }
    };
}

export function withProtected(Component) {
    return function WithProtected(props) {

        const auth = useAuth();
        const router = useRouter();
        const isAuthenticated = auth.currentUser;

        if (!isAuthenticated) {
            router.replace("/login");
            return null;
        } else {
            return withNavbar(<Component {...props}/>)
        }

    };
}
