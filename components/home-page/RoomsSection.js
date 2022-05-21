import Container from "react-bootstrap/Container";
import classes from './styles.module.scss';
import RoomCard from "./RoomCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useEffect, useState} from "react";
import {loadDocs} from "../../store/actions/firestore-docs-actions";
import Centered from "../layout/Centered";
import LoadingSpinner from "../layout/LoadingSpinner";

const renderRooms = rooms => {
    return Object.keys(rooms)?.map(roomUID => (
        <Col xxl={3} xl={4} lg={6} sm={12} key={roomUID} className={'d-flex justify-content-center align-items-center'}>
            <RoomCard roomUID={roomUID} room={rooms[roomUID]}/>
        </Col>
    ));
};


const RoomsSection = props => {

    const {title} = props;

    const [rooms, setRooms] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const handle = async () => {
            const rooms = await loadDocs('rooms');
            setRooms(rooms);
        };
        handle().then(() => setIsLoading(false));
    }, []);

    if (isLoading) {
        return (
            <Centered>
                <LoadingSpinner/>
            </Centered>
        );
    }

    return (
        <Row className={classes.raSection}>
            <h1 className={classes.raSectionTitle}>{title}</h1>
            {Object.keys(rooms).length === 0 &&
                <span className={classes.noRoomsPlaceholder}>No Rooms Available Right Now</span>}
            {renderRooms(rooms)}
        </Row>
    );
};

export default RoomsSection;