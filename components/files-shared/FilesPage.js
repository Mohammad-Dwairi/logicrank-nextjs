import FilesSection from "./FilesSection";
import {useCallback, useEffect, useState} from "react";
import LoadingView from "../../hoc/LoadingView";
import {useAuth} from "../../context/AuthContext";
import {
    fbDeleteFileFromStorage,
    fbGetAllFiles,
    fbUploadBlobToStorage
} from "../../firebase/functions/firebase-storage-functions";


const FilesPage = props => {

    const {dirPath, title} = props;

    const [isLoading, setIsLoading] = useState(true);
    const [files, setFiles] = useState([]);
    const {uid} = useAuth().currentUser;

    const loadFiles = useCallback(async () => {
        const fetchedFiles = await fbGetAllFiles(dirPath);
        setFiles(fetchedFiles);
        setIsLoading(false);
        return fetchedFiles;
    }, [dirPath]);

    useEffect(() => {
        loadFiles();
    }, [loadFiles]);

    const onFileUpload = async (file) => {
        setIsLoading(true);
        await fbUploadBlobToStorage(dirPath, file, uid);
        await loadFiles();
    };

    const onFileDelete = async (filePath) => {
        setIsLoading(true);
        await fbDeleteFileFromStorage(filePath);
        await loadFiles();
    }

    return (
        <LoadingView isLoading={isLoading}>
            <FilesSection title={title} files={files} onFileUpload={onFileUpload} onFileDelete={onFileDelete}/>
        </LoadingView>
    );
};

export default FilesPage;