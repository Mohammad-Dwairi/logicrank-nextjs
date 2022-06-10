import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Image from "next/image";
import Col from "react-bootstrap/Col";

import classes from './styles.module.scss';

const RoomPreview = (props) => {

    const {room, onRoomEnrollment} = props;

    return (
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
                            <span>{room.membersNum} member{room.membersNum === 1 ? '' : 's'}</span>
                        </div>
                        <div className={classes.roomInfoRow}>
                            <span className={classes.key}>Created In</span>
                            <span>{new Date(room?.dateCreated).toLocaleDateString()}</span>
                        </div>
                    </div>

                    <div className={classes.roomInfoRow}>
                        <h3 className={classes.roomPrice}>${room.roomPrice}</h3>
                        <button className={classes.enrollButton} onClick={onRoomEnrollment}>Enroll Now</button>
                    </div>
                </Col>
            </Row>
        </Container>
    );
};

export default RoomPreview;