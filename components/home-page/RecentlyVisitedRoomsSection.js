import RecentlyAccessedRoomCard from "./RecentlyAccessedRoomCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classes from './styles.module.scss';

const renderCard = rooms => {
    return Object.keys(rooms).map(roomUID => (
        <Col key={roomUID} xl={4} lg={12}>
            <RecentlyAccessedRoomCard roomUID={roomUID} room={rooms[roomUID]}/>
        </Col>
    ));
};

const RecentlyVisitedRoomsSection = props => {

    const {recentRooms, title} = props;

    return (
        <Row className={classes.raSection}>
            <h1 className={classes.raSectionTitle}>{title}</h1>
            {Object.keys(recentRooms).length === 0 && <span className={classes.noRoomsPlaceholder}>No Recently Visited Rooms</span>}
            {recentRooms && renderCard(recentRooms)}
        </Row>
    );
};

export default RecentlyVisitedRoomsSection;