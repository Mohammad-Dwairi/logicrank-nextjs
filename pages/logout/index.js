import {withProtected} from "../../hoc/RouteAuth";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {logoutAction} from "../../store/actions/authActions";


const Logout = () => {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(logoutAction());
    }, [dispatch]);

};

export default withProtected(Logout);