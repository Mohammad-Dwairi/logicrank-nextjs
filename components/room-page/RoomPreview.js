import Container from "react-bootstrap/Container";
import {useEffect, useState} from "react";
import Centered from "../layout/Centered";
import LoadingSpinner from "../layout/LoadingSpinner";
import {loadDoc} from "../../store/actions/firestore-docs-actions";
import {useRouter} from "next/router";
import Row from "react-bootstrap/Row";
import Image from "next/image";
import Col from "react-bootstrap/Col";

import classes from './styles.module.scss';
import {arrayUnion, doc, increment, updateDoc} from "firebase/firestore";
import {db} from "../../firebase";
import {useAuth} from "../../store/AuthContext";

const RoomPreview = () => {

    const {currentUser} = useAuth();

    const [room, setRoom] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const router = useRouter();
    const {rid} = router.query;

    useEffect(() => {
        const handle = async () => {
            const thisRoom = await loadDoc('rooms', '__name__', rid);
            setRoom(thisRoom);
            setIsLoading(false);
        };
        handle();
    }, []);

    if (isLoading) {
        return (
            <Centered>
                <LoadingSpinner/>
            </Centered>
        );
    }

    const handleEnrollment = async () => {
        await updateDoc(doc(db, 'users', currentUser.uid), {enrolledRooms: arrayUnion(rid)});
        await updateDoc(doc(db, 'rooms', rid), {membersNum: increment(1), members: arrayUnion(currentUser.uid)});
        router.reload(window.location.path);
    };

    return (
        <Container>
            <Row className='d-flex justify-content-center mt-5'>
                <Col xl={6}>
                    <Image src={room.coverImageURL || require('../../public/dreamer.svg')}
                           width={400}
                           height={300}
                           layout='responsive'
                           objectFit='contain'
                    />
                </Col>
                <Col className='d-flex flex-column justify-content-between'>
                    <div className='mt-3'>
                        <h2>{room.roomName}</h2>
                        <p>{room.roomDescription}</p>
                        <div className={classes.roomInfoRow}>
                            <span className={classes.key}>Level</span>
                            <span>{room.roomLevel}</span>
                        </div>
                        <div className={classes.roomInfoRow}>
                            <span className={classes.key}>Type</span>
                            <span>{room.roomType}</span>
                        </div>
                        <div className={classes.roomInfoRow}>
                            <span className={classes.key}>Instructor</span>
                            <span>{room.roomInstructor}</span>
                        </div>
                        <div className={classes.roomInfoRow}>
                            <span className={classes.key}>Enrolled</span>
                            <span>324 members</span>
                        </div>
                        <div className={classes.roomInfoRow}>
                            <span className={classes.key}>Created In</span>
                            <span>{new Date().toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div className={classes.roomInfoRow}>
                        <h3 className={classes.roomPrice}>${room.roomPrice}</h3>
                        <button className={classes.enrollButton} onClick={handleEnrollment}>Enroll Now</button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default RoomPreview;