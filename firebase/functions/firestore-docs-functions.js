import {addDoc, collection, doc, getDocs, query, updateDoc, where, getDoc} from 'firebase/firestore';
import {db} from "../firebase";


export const fbGetAllDocs = async collectionPath => {
    const querySnapshot = await getDocs(collection(db, collectionPath));
    const docs = {};
    querySnapshot.forEach(doc => {
        docs[doc.id] = doc.data();
    });
    return docs;
};

export const fbQueryDocByUID = async (collectionPath, uid) => {
    const collectionRef = collection(db, collectionPath);
    const q = await query(collectionRef, where('__name__', '==', uid));
    const querySnapshot = await getDocs(q);
    return querySnapshot?.docs[0]?.data();
};

export const fbQueryAllDocs = async (col, key, value) => {
    const colRef = collection(db, col);
    const q = await query(colRef, where(key, '==', value));
    const querySnapshot = await getDocs(q);
    const docs = {};
    querySnapshot.docs.forEach(doc => docs[doc.id] = doc.data());
    return docs;
};

export const fbQueryDocs = async (fbQuery) => {
    const querySnapshot = await getDocs(fbQuery);
    const fetchedDocs = {};
    querySnapshot.forEach(doc => {
        fetchedDocs[doc.id] = doc.data();
    });
    return fetchedDocs;
};

export const fbQuerySingleDoc = async (fbQuery) => {
    const querySnapshot = await getDocs(fbQuery);
    return querySnapshot.docs[0].data();
};

export const fbAddNewDoc = async (collectionRef, data) => {
    return await addDoc(collectionRef, data);
};


export const fbSetNewDoc = async (collectionPath, data) => {
    // TODO
};

export const fbUpdateDocByUID = async (collectionPath, uid, updatedFieldsObj) => {
    if (!updatedFieldsObj) return;
    const docRef = doc(db, collectionPath, uid);
    await updateDoc(docRef, updatedFieldsObj);
};

export const fbUpdateDocByQuery = async () => {
    // TODO
};

export const checkDocExist = async (fbQuery) => {
    const docSnapshot = await getDoc(fbQuery);
    return docSnapshot.exists();
};