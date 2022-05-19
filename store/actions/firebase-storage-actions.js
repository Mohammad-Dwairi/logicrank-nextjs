import {getDownloadURL, ref, uploadBytes} from "firebase/storage";
import {storage} from "../../firebase";


export const uploadBlobToStorage = async (file) => {
    const storageRef = ref(storage, `${file.name}`);
    await uploadBytes(storageRef, file);
    return await getDownloadURL(storageRef);
}