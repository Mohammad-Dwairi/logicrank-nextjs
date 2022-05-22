import RoomSideNavbar from "../../../components/room-page/RoomSideNavbar";
import FilesSection from "../../../components/room-materials-page/FilesSection";
import {withProtected} from "../../../hoc/RouteAuth";
import {useCallback, useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useDispatch, useSelector} from "react-redux";
import {fbGetAllFiles} from "../../../firebase/functions/firebase-storage-functions";
import {addToCache} from "../../../store/actions/cacheActions";
import LoadingView from "../../../hoc/LoadingView";


const MaterialsPage = props => {

    const [isLoading, setIsLoading] = useState(true);
    const {rid} = useRouter().query;
    const roomsCache = useSelector(state => state.cacheCtx['roomsCache']);
    const dispatch = useDispatch();

    const loadRoomFiles = useCallback(async () => {
        return await fbGetAllFiles(`${rid}/materials`);
    }, [rid]);

    useEffect(() => {
        // this implementation is not necessary right now and could be simpler, but it is easier to scale.
        // the cache is limited to one room only
        if (!roomsCache[rid]) {
            const files = loadRoomFiles();
            dispatch(addToCache('roomsCache', rid, files));
        }
        setIsLoading(false);
    }, [dispatch, loadRoomFiles, rid, roomsCache]);

    return (
        <LoadingView isLoading={isLoading}>
            <div className='d-flex'>
                <div>
                    <RoomSideNavbar/>
                </div>
                <div className='flex-grow-1'>
                    <FilesSection files={roomsCache[rid]}/>
                </div>
            </div>
        </LoadingView>
    );
};

export default withProtected(MaterialsPage);