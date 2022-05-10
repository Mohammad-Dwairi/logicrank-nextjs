import React, {useContext, useEffect, useState} from "react";
import {auth} from '../firebase';

import {sendPasswordResetEmail, signOut} from "firebase/auth";
import {loginHandler, signupHandler} from "./actions/auth-actions";

const AuthContext = React.createContext(null);


export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    function signup(email, password, fullName) {
        return signupHandler(fullName, email, password);
    }

    function login(email, password) {
        return loginHandler(email, password);
    }

    function logout() {
        return signOut(auth);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
    }

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            setCurrentUser(user);
            setLoading(false);
        })
    }, []);

    const value = {
        currentUser,
        login,
        signup,
        logout,
        resetPassword
    };

    return (
        <AuthContext.Provider value={value}>
            {!loading && children}
        </AuthContext.Provider>
    );
}