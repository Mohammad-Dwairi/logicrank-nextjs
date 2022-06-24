import FilesSection from "./FilesSection";
import {useCallback, useEffect, useLayoutEffect, useState} from "react";
import LoadingView from "../../hoc/LoadingView";
import {useAuth} from "../../context/AuthContext";
import {
    fbDeleteFileFromStorage,
    fbGetAllFiles,
    fbUploadBlobToStorage
} from "../../firebase/functions/firebase-storage-functions";
import {fbQueryDocByUID} from "../../firebase/functions/firestore-docs-functions";
import {useRouter} from "next/router";
import {ROOMS_COLLECTION} from "../../firebase/constants/COLLECTIONS";


const FilesPage = props => {

    const {dirPath, title} = props;

    const [isLoading, setIsLoading] = useState(true);
    const [files, setFiles] = useState([]);
    const {uid} = useAuth().currentUser;
    const {rid} = useRouter().query;

    const [isOwner, setIsOwner] = useState(false);

    useLayoutEffect(() => {
        const fetchRoom = async () => {
            const room = await fbQueryDocByUID(ROOMS_COLLECTION, rid);
            if (room) {
                setIsOwner(room.roomInstructorUID === uid);
            }
        };
        fetchRoom();
    }, [rid, uid]);

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
        if (isOwner) {
            const isConfirmed = window.confirm("Please confirm to delete this file");
            if (isConfirmed) {
                setIsLoading(true);
                await fbDeleteFileFromStorage(filePath);
                await loadFiles();
            } 
        }
    }

    if (isLoading) return <LoadingView/>;

    return (
        <FilesSection isOwner={isOwner} title={title} files={files} onFileUpload={onFileUpload} onFileDelete={onFileDelete}/>
    );
};

export default FilesPage;