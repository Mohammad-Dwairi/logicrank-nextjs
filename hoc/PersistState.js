import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {loadUserInfo} from "../store/actions/user-actions";
import {useAuth} from "../context/AuthContext";


const PersistState = ({children}) => {

    const dispatch = useDispatch();
    const auth = useAuth();
    const userInfo = useSelector(state => state.userCtx.userInfo);

    useEffect(() => {
        if (auth.currentUser) {
            if (!userInfo) {
                console.log("user info state lost, reloading...")
                dispatch(loadUserInfo(auth.currentUser.uid))
            }
        }
    }, [auth]);

    return children;
};

export default PersistState;