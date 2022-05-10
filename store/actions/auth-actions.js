import {createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {auth, db} from "../../firebase";
import {collection, doc, setDoc} from "firebase/firestore";


export const signupHandler = async (fullName, email, password) => {
    try {
        const userCredentials = await createUserWithEmailAndPassword(auth, email, password);
        const usersRef = collection(db, 'users');
        await setDoc(doc(usersRef, userCredentials.user.uid), {fullName: fullName});
    } catch (e) {
        console.log(e);
    }
};

export const loginHandler = async (email, password) => {
    try {
        const userCredentials = await signInWithEmailAndPassword(auth, email, password);
        console.log("LOGGED IN, ", userCredentials.user.uid);
    } catch (e) {
        if (e.message.includes('wrong-password') || e.message.includes('user-not-found')) {
            throw new Error('Invalid Email or Password');
        }
    }
};