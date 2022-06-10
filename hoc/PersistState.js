import {useEffect} from "react";
import {useAuth} from "../context/AuthContext";


const PersistState = ({children}) => {

    const {userInfo, fetchUserInfo, currentUser} = useAuth();

    useEffect(() => {
        if (!userInfo) {
            console.warn("user info state lost, reloading...");
            fetchUserInfo(currentUser.uid);
        }
    }, [userInfo]);

    return children;
};


export default PersistState;