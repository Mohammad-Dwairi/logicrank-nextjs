import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";
import {fbQueryDocByUID} from "../../firebase/functions/firestore-docs-functions";
import RoomSideNavbar from "./RoomSideNavbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NewPostInput from "./NewPostInput";
import NewsFeedSection from "./NewsFeedSection";
import {useAuth} from "../../context/AuthContext";
import LoadingView from "../../hoc/LoadingView";
import {ROOMS_COLLECTION} from "../../firebase/constants/COLLECTIONS";
import {useDispatch, useSelector} from "react-redux";
import {loadUserInfo, updateUserInfo} from "../../store/actions/user-actions";


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
                    <Container>
                        <Row className='d-flex justify-content-center'>
                            <Col xl={7}>
                                <NewPostInput
                                    onSubmitStart={() => setIsLoading(true)}
                                    onSubmitFinish={() => setIsLoading(false)}
                                />
                            </Col>
                        </Row>
                        <Row className='d-flex justify-content-center'>
                            <Col xl={7}>
                                <NewsFeedSection/>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </section>
        </LoadingView>
    );

};

export default EnrolledRoom;