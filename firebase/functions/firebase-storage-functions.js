import {getDownloadURL, getMetadata, listAll, ref, updateMetadata, uploadBytes, deleteObject} from "firebase/storage";
import {storage} from "../firebase";


export const fbUploadBlobToStorage = async (path, file, owner) => {
    const storageRef = ref(storage, `${path}/${file.name}`);
    await uploadBytes(storageRef, file);
    if (owner) {
        await updateMetadata(storageRef, {customMetadata: {owner: owner}});
    }
    return await getDownloadURL(storageRef);
};

export const fbDeleteFileFromStorage = async (filePath) => {
    const fileRef = ref(storage, filePath);
    await deleteObject(fileRef);
};

export const fbGetAllFiles = async (dirPath) => {
    const filesRef = ref(storage, dirPath);
    const fetchedFiles = [];
    const fetchedRefs = await listAll(filesRef);
    for (const itemRef of fetchedRefs.items) {
        const meta = await getMetadata(itemRef);
        fetchedFiles.push({
            name: meta.name,
            type: meta.contentType,
            timeCreated: meta.timeCreated,
            size: meta.size,
            link: await getDownloadURL(itemRef),
            owner: meta.customMetadata.owner
        });
    }
    return fetchedFiles;
};