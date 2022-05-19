import {ref, uploadBytes} from "firebase/storage";
import {storage} from "../../firebase";


export const uploadBlobToStorage = async (file) => {
    const storageRef = ref(storage, `${file.name}`);
    return await uploadBytes(storageRef, file);
}