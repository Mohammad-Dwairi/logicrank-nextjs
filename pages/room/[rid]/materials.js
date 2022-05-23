import RoomSideNavbar from "../../../components/room-page/RoomSideNavbar";
import FilesSection from "../../../components/room-materials-page/FilesSection";
import {withProtected} from "../../../hoc/RouteAuth";
import {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {fbGetAllFiles, fbUploadBlobToStorage} from "../../../firebase/functions/firebase-storage-functions";
import LoadingView from "../../../hoc/LoadingView";
import {useAuth} from "../../../context/AuthContext";


const MaterialsPage = props => {

    const [isLoading, setIsLoading] = useState(true);
    const [files, setFiles] = useState(null);
    const {rid} = useRouter().query;
    const {uid} = useAuth().currentUser;

    // const roomsCache = useSelector(state => state.cacheCtx['roomsCache']);
    // const dispatch = useDispatch();

    const loadRoomFiles = useCallback(async () => {
        const fetchedFiles = await fbGetAllFiles(`${rid}/materials`);
        setFiles(fetchedFiles);
        setIsLoading(false);
        return fetchedFiles;
    }, [rid]);

    useEffect(() => {
        loadRoomFiles();
    }, [loadRoomFiles]);

    // useEffect(() => {
    //     // this implementation is not necessary right now and could be simpler, but it is easier to scale.
    //     // the cache is limited to one room only
    //     if (!roomsCache[rid]) {
    //         const files = loadRoomFiles();
    //         dispatch(addToCache('roomsCache', rid, files));
    //     }
    //     setIsLoading(false);
    // }, [dispatch, loadRoomFiles, rid, roomsCache]);

    const onFileUpload = async (file) => {
        setIsLoading(true);
        await fbUploadBlobToStorage(`${rid}/materials`, file, uid);
        await loadRoomFiles();
    };

    return (
        <LoadingView isLoading={isLoading}>
            <div className='d-flex'>
                <div>
                    <RoomSideNavbar/>
                </div>
                <div className='flex-grow-1'>
                    <FilesSection files={files} onFileUpload={onFileUpload}/>
                </div>
            </div>
        </LoadingView>
    );
};

export default withProtected(MaterialsPage);