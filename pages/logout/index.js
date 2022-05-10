import {withProtected} from "../../hoc/RouteAuth";
import {useCallback, useEffect} from "react";
import {useAuth} from "../../store/AuthContext";


const Logout = () => {

    const {logout} = useAuth();
    const logoutHandler = useCallback(async () => await logout(), [logout]);

    useEffect(() => {
        logoutHandler();
    }, [logoutHandler]);

};

export default withProtected(Logout);