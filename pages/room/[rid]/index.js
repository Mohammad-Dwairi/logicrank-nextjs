import {withProtected} from "../../../hoc/RouteAuth";
import {useRouter} from "next/router";
import EnrolledRoom from "../../../components/room-page/EnrolledRoom";
import RoomPreview from "../../../components/room-page/RoomPreview";
import {useAuth} from "../../../context/AuthContext";
import {useCallback, useEffect, useState} from "react";
import {fbQueryDocByUID, fbUpdateDocByUID} from "../../../firebase/functions/firestore-docs-functions";
import {ROOMS_COLLECTION} from "../../../firebase/constants/COLLECTIONS";
import {arrayUnion, increment} from "firebase/firestore";
import LoadingView from "../../../hoc/LoadingView";


const Room = () => {

    const {currentUser, userInfo, updateUserInfo} = useAuth();

    const router = useRouter();
    const {rid} = router.query;
    const isUserEnrolled = userInfo && userInfo.enrolledRooms && userInfo.enrolledRooms.includes(rid);

    const [room, setRoom] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

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

    const fetchRoom = useCallback(async () => {
        const fetchedRoom = await fbQueryDocByUID(ROOMS_COLLECTION, rid);
        if (fetchedRoom) {
            setRoom(fetchedRoom);
            if (isUserEnrolled) {
                const recentRooms = updateRecentlyVisitedRooms();
                await updateUserInfo(currentUser.uid, {recentRooms});
            }
            setIsLoading(false);
        }
        else await router.push('/404');

    }, [rid]);


    const onRoomEnrollment = async () => {
        updateUserInfo(currentUser.uid, {enrolledRooms: arrayUnion(rid)});
        await fbUpdateDocByUID(ROOMS_COLLECTION, rid, {membersNum: increment(1), members: arrayUnion(currentUser.uid)})
    };

    useEffect(() => {
        fetchRoom();
    }, [fetchRoom]);

    if (isLoading) return <LoadingView />

    return isUserEnrolled ? <EnrolledRoom room={room}/> : <RoomPreview room={room} onRoomEnrollment={onRoomEnrollment}/>;

};

export default withProtected(Room);