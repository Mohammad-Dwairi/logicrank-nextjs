import {
    createUserWithEmailAndPassword,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut
} from "firebase/auth";
import {auth, db} from "../firebase";
import {collection, doc, setDoc} from "firebase/firestore";


export const fbRegister = async (fullName, email, password) => {
    const userCredentials = await createUserWithEmailAndPassword(auth, email, password)
        .catch(e => {
            console.log(e);
        });
    const usersRef = collection(db, 'users');
    await setDoc(doc(usersRef, userCredentials.user.uid), {fullName: fullName});
};

export const fbLogin = async (email, password) => {
    await signInWithEmailAndPassword(auth, email, password).catch(e => {
        if (e.message.includes('wrong-password') || e.message.includes('user-not-found')) {
            throw new Error('Invalid Email or Password');
        }
    });
};

export const fbLogout = async () => {
    await signOut(auth);
};

export const fbrResetPassword = email => {
    return sendPasswordResetEmail(auth, email);
};
