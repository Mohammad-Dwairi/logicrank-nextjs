import {useRouter} from "next/router";
import React from "react";
import LoadingView from "./LoadingView";
import {useAuth} from "../context/AuthContext";

export function withPublic(Component) {
    return function WithPublic(props) {

        const auth = useAuth();
        const router = useRouter();

        if (auth.currentUser) {
            router.replace("/home");
        }

        return (
            <LoadingView isLoading={auth.currentUser}>
                <Component {...props} />
            </LoadingView>
        );
    };
}

export function withProtected(Component) {
    return function WithProtected(props) {

        const auth = useAuth();
        const router = useRouter();

        if (!auth.currentUser) {
            router.replace("/login");
        }

        return (
            <LoadingView isLoading={!auth.currentUser}>
                <Component {...props} />
            </LoadingView>
        );
    };
}
