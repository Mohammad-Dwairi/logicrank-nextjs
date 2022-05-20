import {getDownloadURL, ref, uploadBytes, updateMetadata} from "firebase/storage";
import {storage} from "../../firebase";


export const uploadBlobToStorage = async (path, file, owner) => {
    const storageRef = ref(storage, `${path}/${file.name}`);
    await uploadBytes(storageRef, file);
    console.log(owner)
    if (owner) {
        console.log("UPDATING", await updateMetadata(storageRef, {customMetadata: {owner: owner}}));
    }
    return await getDownloadURL(storageRef);
}