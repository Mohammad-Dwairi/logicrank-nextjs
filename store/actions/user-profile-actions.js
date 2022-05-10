import {doc, updateDoc, deleteField} from 'firebase/firestore';
import {auth, db} from "../../firebase";


export const userInfoChangeHandler = async (fieldName, fieldValue) => {
    if (!fieldName) return;
    const userRef = doc(db, 'users', auth.currentUser.uid);
    await updateDoc(userRef, {[fieldName]: fieldValue ? fieldValue : deleteField()})
}