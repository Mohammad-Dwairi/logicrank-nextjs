import RecentlyAccessedRoomCard from "./RecentlyAccessedRoomCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classes from './styles.module.scss';
import {useCallback, useEffect, useState} from "react";
import {fbQueryDocs} from "../../firebase/functions/firestore-docs-functions";
import {collection, query, where} from "firebase/firestore";
import {ROOMS_COLLECTION} from "../../firebase/constants/COLLECTIONS";
import {db} from "../../firebase/firebase";
import {useAuth} from "../../context/AuthContext";
import LoadingView from "../../hoc/LoadingView";

const renderCard = rooms => {
    return Object.keys(rooms).map(roomUID => (
        <Col key={roomUID} xl={4} lg={12}>
            <RecentlyAccessedRoomCard roomUID={roomUID} room={rooms[roomUID]}/>
        </Col>
    ));
};

const RecentlyAccessRoomsSection = props => {

    const {recentRoomsUIDs, title} = props;
    const [rooms, setRooms] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const {uid} = useAuth().currentUser;

    const loadRooms = useCallback(async () => {
        if (!recentRoomsUIDs) return;
        setIsLoading(true);
        const roomsRef = collection(db, ROOMS_COLLECTION);
        const q = query(roomsRef, where('__name__', 'in', recentRoomsUIDs));
        const rooms = await fbQueryDocs(q);
        setRooms(rooms);
        setIsLoading(false);
    }, [recentRoomsUIDs]);

    useEffect(() => {
        loadRooms();
    }, [loadRooms, recentRoomsUIDs]);

    console.log(rooms)

    return (
        <LoadingView isLoading={isLoading}>
            <Row className={classes.raSection}>
                <h1 className={classes.raSectionTitle}>{title}</h1>
                {Object.keys(rooms || {}).length === 0 &&
                    <span className={classes.noRoomsPlaceholder}>No Recently Visited Rooms</span>}
                {rooms && renderCard(rooms)}
            </Row>
        </LoadingView>

    );
};

export default RecentlyAccessRoomsSection;