import React, {useContext, useEffect, useState} from "react"
import {auth} from '../firebase';

import {createUserWithEmailAndPassword} from "firebase/auth";
import {useRouter} from "next/router";

const AuthContext = React.createContext(null);


export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {
    const router = useRouter();
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    function signup(email, password) {
        return createUserWithEmailAndPassword(auth, email, password)
            .then(user => {
                console.log(user);
                router.replace('/home')
            }).catch((e) => console.log(e));
    }

    function login(email, password) {
        return auth.signInWithEmailAndPassword(email, password)
    }

    function logout() {
        return auth.signOut()
    }

    function resetPassword(email) {
        return auth.sendPasswordResetEmail(email)
    }

    useEffect(() => {
        return auth.onAuthStateChanged(user => {
            setCurrentUser(user)
            setLoading(false)
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