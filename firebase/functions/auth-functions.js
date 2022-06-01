import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {auth, db} from "../firebase";
import {collection, doc, setDoc, updateDoc} from "firebase/firestore";
import {USERS_COLLECTION} from "../constants/COLLECTIONS";


export const fbRegister = async (fullName, email, password) => {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        .catch(e => {
            console.log(e);
        });
    const usersRef = collection(db, 'users');
    await setDoc(doc(usersRef, userCredentials.user.uid), {email, fullName, isOnline: true, createdAt: +new Date()});
};

export const fbLogin = async (email, password) => {
    const response = await signInWithEmailAndPassword(auth, email, password).catch(e => {
        if (e.message.includes('wrong-password') || e.message.includes('user-not-found')) {
            throw new Error('Invalid Email or Password');
        }
    });
    await updateDoc(doc(db, USERS_COLLECTION, response.user.uid), {isOnline: true});
};

export const fbLogout = async (uid) => {
    await signOut(auth);
    await updateDoc(doc(db, USERS_COLLECTION, uid), {isOnline: false});
};

export const fbrResetPassword = email => {
    return sendPasswordResetEmail(auth, email);
};
