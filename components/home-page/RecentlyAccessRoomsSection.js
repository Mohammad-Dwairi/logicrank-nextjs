import RecentlyAccessedRoomCard from "./RecentlyAccessedRoomCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classes from './styles.module.scss';

const renderCard = rooms => {
    rooms = rooms.slice(0, 3);
    return rooms.map((room, index) => (
        <Col key={index} xl={4} lg={12}>
            <RecentlyAccessedRoomCard room={room}/>
        </Col>
    ));
};

const RecentlyAccessRoomsSection = props => {

    const {rooms, title} = props;

    return (
        <Container fluid className={classes.raSection}>
            <h1 className={classes.raSectionTitle}>{title}</h1>
            <Row>
                {renderCard(rooms)}
            </Row>
        </Container>
    );
};

export default RecentlyAccessRoomsSection;