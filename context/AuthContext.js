import React, {useContext, useEffect, useState} from "react";
import {auth} from '../firebase/firebase';
import {useDispatch} from "react-redux";
import {loadUserInfo} from "../store/actions/user-actions";

const AuthContext = React.createContext(null);


export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)
    const dispatch = useDispatch();

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })
    }, []);

    const value = {currentUser};

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}