import {useRouter} from "next/router";
import React from "react";
import {useAuth} from "../contexts/AuthContext";
import LoadingSpinner from "../components/layout/LoadingSpinner";
import Centered from "../components/layout/Centered";

export function withPublic(Component) {
    return function WithPublic(props) {
        const auth = useAuth();
        const router = useRouter();

        if (auth.currentUser) {
            router.replace("/home");
            return (<Centered><LoadingSpinner /></Centered>)
        }
        return <Component auth={auth} {...props} />;
    };
}

export function withProtected(Component) {
    return function WithProtected(props) {
        const auth = useAuth();
        const router = useRouter();

        if (!auth.currentUser) {
            router.replace("/login");
            return <Centered><LoadingSpinner /></Centered>;
        }

        return <Component auth={auth} {...props} />;
    };
}
