import {useRouter} from 'next/router';
import RoomSideNavbar from "../../../components/room-page/RoomSideNavbar";
import NewPostInput from "../../../components/room-page/NewPostInput";
import NewsFeedSection from "../../../components/room-page/NewsFeedSection";
import Container from "react-bootstrap/Container";
import {withProtected} from "../../../hoc/RouteAuth";
import {useEffect} from "react";
import {userInfoChangeHandler} from "../../../store/actions/user-profile-actions";
import {useUser} from "../../../store/UserContext";
import {loadDoc} from "../../../store/actions/firestore-docs-actions";

const Room = () => {

    const router = useRouter();
    const {rid} = router.query;

    const {userInfo} = useUser();

    useEffect(() => {
        const handle = async () => {
            const thisRoom = await loadDoc('rooms', '__name__', rid); // to be changed to roomDetails collection then save only necessary fields in userInfo
            let recentRooms = [];
            if (userInfo.recentRooms?.length < 3) {
                recentRooms = [...userInfo.recentRooms];
            } else if (userInfo.recentRooms?.length >= 3) {
                recentRooms = [...userInfo.recentRooms];
                recentRooms.shift();
            }
            recentRooms.push(thisRoom);
            userInfoChangeHandler('recentRooms', recentRooms);
        };
        handle();
    }, []);

    return (
        <section className='d-flex'>
            <div>
                <RoomSideNavbar/>
            </div>
            <div className='flex-grow-1'>
                <NewPostInput/>
                <Container>
                    <NewsFeedSection/>
                </Container>
            </div>
        </section>
    );
};

export default withProtected(Room);