import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";
import {fbQueryDocByUID} from "../../firebase/functions/firestore-docs-functions";
import RoomSideNavbar from "./RoomSideNavbar";
import {useAuth} from "../../context/AuthContext";
import LoadingView from "../../hoc/LoadingView";
import {ROOMS_COLLECTION} from "../../firebase/constants/COLLECTIONS";
import {useDispatch, useSelector} from "react-redux";
import {updateUserInfo} from "../../store/actions/user-actions";
import {Tab, Tabs} from "react-bootstrap";
import NewsFeedPage from "./NewsFeedPage";
import LecturesPage from "./LecturesPage";


const EnrolledRoom = () => {

    const router = useRouter();
    const {rid} = router.query;

    const userInfo = useSelector(state => state.userCtx.userInfo);
    const {uid} = useAuth().currentUser;

    const [room, setRoom] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch();

    const updateRecentlyVisitedRooms = () => {

        let recentRooms = userInfo.recentRooms ? [...userInfo?.recentRooms] : [];

        if (recentRooms.length < 3) {
            recentRooms.push(rid);
            return recentRooms;
        }

        if (recentRooms.length === 3) {
            if (recentRooms[recentRooms.length - 1] === rid) return recentRooms;
            const i = recentRooms.indexOf(rid);
            if (i !== -1) {
                const temp = recentRooms[recentRooms.length - 1];
                recentRooms[recentRooms.length - 1] = recentRooms[i];
                recentRooms[i] = temp;
            } else {
                recentRooms.shift();
                recentRooms.push(rid)
            }
        }

        return recentRooms;
    };

    const loadRoom = useCallback(async () => {
        setIsLoading(true);
        const thisRoom = await fbQueryDocByUID(ROOMS_COLLECTION, rid);
        const recentRooms = updateRecentlyVisitedRooms();
        setRoom(thisRoom);
        await dispatch(updateUserInfo(uid, {recentRooms}));
        setIsLoading(false);
    }, [dispatch, rid, uid]);

    useEffect(() => {
        loadRoom();
    }, [loadRoom]);

    return (
        <LoadingView isLoading={isLoading}>
            <section className='d-flex'>
                <div>
                    <RoomSideNavbar roomCoverImg={room.coverImageURL}/>
                </div>
                <div className='flex-grow-1'>
                    <Tabs defaultActiveKey="updates" className="mb-3 justify-content-center">
                        <Tab eventKey="updates" title="Newsfeed & Updates">
                            <NewsFeedPage room={room}/>
                        </Tab>
                        <Tab eventKey="lectures" title="Lectures">
                            <LecturesPage />
                        </Tab>
                    </Tabs>
                </div>
            </section>
        </LoadingView>
    );

};

export default EnrolledRoom;