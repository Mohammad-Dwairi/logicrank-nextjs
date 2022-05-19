import {addDoc, collection, getDocs} from 'firebase/firestore';
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