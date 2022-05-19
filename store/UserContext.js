import React, {useCallback, useContext, useEffect, useState} from "react";
import {useAuth} from "./AuthContext";
import {getUserByUID} from "./actions/user-profile-actions";

const UserContext = React.createContext(null);

export const useUser = () => {
    return useContext(UserContext);
};

export function UserProvider({children}) {

    const [userInfo, setUserInfo] = useState(null)
    const [isLoading, setIsLoading] = useState(true);

    const {currentUser} = useAuth();

    const reloadUserInfo = useCallback(() => {
        if (!currentUser) {
            setIsLoading(false);
            return;
        }
        getUserByUID(currentUser.uid)
            .then(userInfo => setUserInfo(userInfo))
            .then(() => setIsLoading(false));
    }, []);

    useEffect(() => {
        reloadUserInfo();
    }, [reloadUserInfo]);

    const value = {userInfo, reloadUserInfo};

    return (
        <UserContext.Provider value={value}>
            {!isLoading && children}
        </UserContext.Provider>
    );
}