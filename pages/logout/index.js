import {withProtected} from "../../hoc/RouteAuth";
import {useEffect} from "react";
import {useAuth} from "../../context/AuthContext";
import LoadingView from "../../hoc/LoadingView";
import {fbLogout} from "../../firebase/functions/auth-functions";
import {useRouter} from "next/router";


const Logout = () => {

    const {uid} = useAuth().currentUser;
    const router = useRouter();

    useEffect(() => {
        fbLogout(uid);
    }, [uid]);

    return null
};

export default withProtected(Logout);