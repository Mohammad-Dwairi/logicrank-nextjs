import classes from './styles.module.scss';
import RoomCard from "./RoomCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const renderRooms = (rooms, hidePrice) => {
    return Object.keys(rooms)?.map(roomUID => (
        <Col xxl={3} xl={4} lg={6} sm={12} key={roomUID} className={'d-flex justify-content-center align-items-center'}>
            <RoomCard roomUID={roomUID} room={rooms[roomUID]} hidePrice={hidePrice}/>
        </Col>
    ));
};

const RoomsSection = ({rooms, title, hidePrice}) => {
    return (
        <Row className={classes.raSection}>
            <h1 className={classes.raSectionTitle}>{title}</h1>
            {Object.keys(rooms).length === 0 &&
                <span className={classes.noRoomsPlaceholder}>No Rooms Available Right Now</span>}
            {renderRooms(rooms, hidePrice)}
        </Row>
    );
};

export default RoomsSection;