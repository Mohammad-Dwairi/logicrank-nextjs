import {useRouter} from "next/router";
import {useUser} from "../../store/UserContext";
import {useEffect, useState} from "react";
import {loadDoc} from "../../store/actions/firestore-docs-actions";
import {userInfoChangeHandler} from "../../store/actions/user-profile-actions";
import Centered from "../layout/Centered";
import LoadingSpinner from "../layout/LoadingSpinner";
import RoomSideNavbar from "./RoomSideNavbar";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import NewPostInput from "./NewPostInput";
import NewsFeedSection from "./NewsFeedSection";


const EnrolledRoom = () => {

    const router = useRouter();
    const {rid} = router.query;

    const {userInfo} = useUser();

    const [room, setRoom] = useState({});
    const [isLoading, setIsLoading] = useState(false);

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
            setRoom(thisRoom);
            userInfoChangeHandler('recentRooms', recentRooms);
        };
        setIsLoading(true);
        handle();
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return (
            <Centered>
                <LoadingSpinner />
            </Centered>
        );
    }
    return (
        <section className='d-flex'>
            <div>
                <RoomSideNavbar roomCoverImg={room.coverImageURL}/>
            </div>
            <div className='flex-grow-1'>
                <Container>
                    <Row className='d-flex justify-content-center'>
                        <Col xl={7}>
                            <NewPostInput setIsLoading={setIsLoading}/>
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
    );

};

export default EnrolledRoom;