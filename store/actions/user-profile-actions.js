import {doc, updateDoc, deleteField, collection, query, where, getDocs} from 'firebase/firestore';
import {auth, db} from "../../firebase";
import {signOut} from "firebase/auth";


export const userInfoChangeHandler = async (fieldName, fieldValue) => {
    if (!fieldName) return;
    const userRef = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(userRef, {[fieldName]: fieldValue ? fieldValue : deleteField()})
}

export const getUserByUID = async (uid) => {
    const usersRef = collection(db, 'users');
    const q = await query(usersRef, where('__name__', '==', uid));
    const querySnapshot = await getDocs(q);
    // if (!querySnapshot.docs[0]) {
    //     return signOut(auth);
    // }
    return querySnapshot?.docs[0]?.data();
};