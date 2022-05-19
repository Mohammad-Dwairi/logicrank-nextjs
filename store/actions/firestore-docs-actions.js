import {addDoc, collection} from 'firebase/firestore';
import {db} from "../../firebase";

export const uploadDoc = async (col, newDoc) => {

    try {
        return await addDoc(collection(db, col), newDoc);
    } catch (e) {
        console.log(e);
    }
};