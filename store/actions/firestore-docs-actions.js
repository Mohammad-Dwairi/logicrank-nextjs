import {addDoc, collection, getDocs, query, where} from 'firebase/firestore';
import {db} from "../../firebase";

export const uploadDoc = async (col, newDoc) => {
    try {
        return await addDoc(collection(db, col), newDoc);
    } catch (e) {
        console.log(e);
    }
};

export const loadDocs = async (col) => {
    const querySnapshot = await getDocs(collection(db, col));
    const docs = {};
    querySnapshot.forEach(doc => {
        docs[doc.id] = doc.data();
    });
    return docs;
};

export const loadDoc = async (col, key, value) => {
    const colRef = collection(db, col);
    const q = await query(colRef, where(key, '==', value));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].data();
};