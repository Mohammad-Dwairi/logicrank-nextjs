import React, {useContext, useEffect, useState} from "react";

import {collection, addDoc} from "firebase/firestore";
import {auth, db} from '../firebase';

import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    sendPasswordResetEmail
} from "firebase/auth";
import {useRouter} from "next/router";

const AuthContext = React.createContext(null);


export function useAuth() {
    return useContext(AuthContext)
}

export function AuthProvider({children}) {

    const router = useRouter();
    const [currentUser, setCurrentUser] = useState(null)
    const [loading, setLoading] = useState(true)

    function signup(email, password, fullName) {
        return createUserWithEmailAndPassword(auth, email, password)
            .then(async userCredential => {
                alert(JSON.stringify(userCredential.user.uid))
                try {
                    const docRef = await addDoc(collection(db, 'users'), {fullName: fullName});
                } catch (e) {
                    console.log(e);
                }
            });
    }

    function login(email, password) {
        return signInWithEmailAndPassword(auth, email, password).then(user => {
            router.replace('/home');
        }).catch(e => {
            if (e.message.includes('wrong-password') || e.message.includes('user-not-found')) {
                throw new Error('Invalid Email or Password');
            }
        });
    }

    function logout() {
        return signOut(auth);
    }

    function resetPassword(email) {
        return sendPasswordResetEmail(auth, email);
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