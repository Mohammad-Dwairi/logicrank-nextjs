import Container from "react-bootstrap/Container";
import {useEffect, useState} from "react";
import {fbQueryDocByUID, fbUpdateDocByUID} from "../../firebase/functions/firestore-docs-functions";
import {useRouter} from "next/router";
import Row from "react-bootstrap/Row";
import Image from "next/image";
import Col from "react-bootstrap/Col";

import classes from './styles.module.scss';
import {arrayUnion, increment} from "firebase/firestore";
import {useAuth} from "../../context/AuthContext";
import LoadingView from "../../hoc/LoadingView";
import {ROOMS_COLLECTION} from "../../firebase/constants/COLLECTIONS";
import {useDispatch} from "react-redux";
import {updateUserInfo} from "../../store/actions/user-actions";

const RoomPreview = () => {

    const {currentUser} = useAuth();

    const [room, setRoom] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const {rid} = router.query;
    const dispatch = useDispatch();

    useEffect(() => {
        const handle = async () => {
            const thisRoom = await fbQueryDocByUID(ROOMS_COLLECTION, rid);
            setRoom(thisRoom);
            setIsLoading(false);
        };
        handle();
    }, []);

    const handleEnrollment = async () => {
        dispatch(updateUserInfo(currentUser.uid, {enrolledRooms: arrayUnion(rid)}));
        await fbUpdateDocByUID(ROOMS_COLLECTION, rid, {membersNum: increment(1), members: arrayUnion(currentUser.uid)})
        router.reload(window.location.path);
    };

    return (
        <LoadingView isLoading={isLoading}>
            <Container>
                <Row className='d-flex justify-content-center mt-5'>
                    <Col xl={6}>
                        <Image src={room?.coverImageURL || require('../../public/dreamer.svg')}
                               width={400}
                               height={300}
                               layout='responsive'
                               objectFit='contain'
                        />
                    </Col>
                    <Col className='d-flex flex-column justify-content-between'>
                        <div className='mt-3'>
                            <h2>{room?.roomName}</h2>
                            <p>{room?.roomDescription}</p>
                            <div className={classes.roomInfoRow}>
                                <span className={classes.key}>Level</span>
                                <span>{room?.roomLevel}</span>
                            </div>
                            <div className={classes.roomInfoRow}>
                                <span className={classes.key}>Type</span>
                                <span>{room?.roomType}</span>
                            </div>
                            <div className={classes.roomInfoRow}>
                                <span className={classes.key}>Instructor</span>
                                <span>{room?.roomInstructor}</span>
                            </div>
                            <div className={classes.roomInfoRow}>
                                <span className={classes.key}>Enrolled</span>
                                <span>{room?.membersNum} member{room?.membersNum === 1 ? '' : 's'}</span>
                            </div>
                            <div className={classes.roomInfoRow}>
                                <span className={classes.key}>Created In</span>
                                <span>{new Date(room?.dateCreated).toLocaleDateString()}</span>
                            </div>
                        </div>

                        <div className={classes.roomInfoRow}>
                            <h3 className={classes.roomPrice}>${room?.roomPrice}</h3>
                            <button className={classes.enrollButton} onClick={handleEnrollment}>Enroll Now</button>
                        </div>
                    </Col>
                </Row>
            </Container>
        </LoadingView>
    );
};

export default RoomPreview;