import {withProtected} from "../../hoc/RouteAuth";
import {useEffect} from "react";
import {useDispatch} from "react-redux";
import {logoutAction} from "../../store/actions/authActions";
import {useAuth} from "../../context/AuthContext";


const Logout = () => {

    const dispatch = useDispatch();
    const {uid} = useAuth().currentUser;

    useEffect(() => {
        dispatch(logoutAction(uid));
    }, [dispatch]);

};

export default withProtected(Logout);