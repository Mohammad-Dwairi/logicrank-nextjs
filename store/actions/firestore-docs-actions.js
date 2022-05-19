import {addDoc, collection, deleteField, doc, getDocs, query, setDoc, updateDoc, where} from 'firebase/firestore';
import {auth, db} from "../../firebase";

export const uploadDoc = async (col, newDoc) => {
    try {
        return await addDoc(collection(db, col), newDoc);
    } catch (e) {
        console.log(e);
    }
};

export const setDocByUID = async (col, uid, newDoc) => {
    await addDoc(doc(db, col, uid), newDoc);
};

export const updateDocByUID = async (col, uid, fieldName, fieldValue) => {
    if (!uid || !fieldName) return;
    const docRef = doc(db, col, uid, fieldName);
    updateDoc(docRef, {[fieldName]: fieldValue ? fieldValue : deleteField()}).catch(e => {
        if (e.message.includes('No document to update')) {
            setDocByUID(col, uid, {[fieldName]: fieldValue});
        }
    })
    console.log("Uploaded")
}

export const loadDocs = async (col) => {
    const querySnapshot = await getDocs(collection(db, col));
    const docs = {};
    querySnapshot.forEach(doc => {
        docs[doc.id] = doc.data();
    });
    return docs;
};

export const loadDocsByQuery = async (col, key, value) => {
    const colRef = collection(db, col);
    const q = await query(colRef, where(key, '==', value));
    const querySnapshot = await getDocs(q);
    const docs = {};
    querySnapshot.docs.forEach(doc => docs[doc.id] = doc.data());
    return docs;
};

export const loadDoc = async (col, key, value) => {
    const colRef = collection(db, col);
    const q = await query(colRef, where(key, '==', value));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs[0].data();
};