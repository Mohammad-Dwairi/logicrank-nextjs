import RoomSideNavbar from "../../../components/room-page/RoomSideNavbar";
import FilesSection from "../../../components/files-upload-shared/FilesSection";
import {withProtected} from "../../../hoc/RouteAuth";
import {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {
    fbDeleteFileFromStorage,
    fbGetAllFiles,
    fbUploadBlobToStorage
} from "../../../firebase/functions/firebase-storage-functions";
import LoadingView from "../../../hoc/LoadingView";
import {useAuth} from "../../../context/AuthContext";


const MaterialsPage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [files, setFiles] = useState(null);
    const {rid} = useRouter().query;
    const {uid} = useAuth().currentUser;

    const loadRoomFiles = useCallback(async () => {
        const fetchedFiles = await fbGetAllFiles(`${rid}/materials`);
        setFiles(fetchedFiles);
        setIsLoading(false);
        return fetchedFiles;
    }, [rid]);

    useEffect(() => {
        loadRoomFiles();
    }, [loadRoomFiles]);


    const onFileUpload = async (file) => {
        setIsLoading(true);
        await fbUploadBlobToStorage(`${rid}/materials`, file, uid);
        await loadRoomFiles();
    };

    const onFileDelete = async (filePath) => {
        setIsLoading(true);
        await fbDeleteFileFromStorage(filePath);
        await loadRoomFiles();
    }

    return (
        <LoadingView isLoading={isLoading}>
            <div className='d-flex'>
                <div>
                    <RoomSideNavbar/>
                </div>
                <div className='flex-grow-1'>
                    <FilesSection files={files} onFileUpload={onFileUpload} onFileDelete={onFileDelete}/>
                </div>
            </div>
        </LoadingView>
    );
};

export default withProtected(MaterialsPage);