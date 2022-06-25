import React, {useCallback, useContext, useEffect, useState} from "react";
import {auth} from '../firebase/firebase';
import {fbQueryDocByUID, fbUpdateDocByUID} from "../firebase/functions/firestore-docs-functions";
import {USERS_COLLECTION} from "../firebase/constants/COLLECTIONS";

const AuthContext = React.createContext(null);


export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState(null);
    const [userInfo, setUserInfo] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const fetchUserInfo = useCallback(async (userId) => {
        if (userId) {
            const fetchedUserInfo = await fbQueryDocByUID(USERS_COLLECTION, userId);
            if (fetchedUserInfo) {
                setUserInfo(fetchedUserInfo);
            } else {
                throw new Error("User's Info not found");
            }
        }
    }, []);

    const updateUserInfo = useCallback(async (userId, updatedInfoObj) => {
        await fbUpdateDocByUID(USERS_COLLECTION, userId, updatedInfoObj);
        await fetchUserInfo(userId);
    }, []);

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            if (user) {
                fetchUserInfo(user.uid).then(() => setIsLoading(false));
            } else {
                setIsLoading(false);
            }
        });
    }, []);


    const value = {currentUser, userInfo, fetchUserInfo, updateUserInfo, isLoading};

    return (
        <AuthContext.Provider value={value}>
            {!isLoading ? children : null}
        </AuthContext.Provider>
    );
}