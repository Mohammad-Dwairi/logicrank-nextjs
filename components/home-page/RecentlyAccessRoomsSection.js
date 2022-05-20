import RecentlyAccessedRoomCard from "./RecentlyAccessedRoomCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import classes from './styles.module.scss';
import {useEffect, useState} from "react";
import {useUser} from "../../store/UserContext";
import Centered from "../layout/Centered";
import LoadingSpinner from "../layout/LoadingSpinner";
import {set} from "react-hook-form";

const renderCard = rooms => {
    return Object.keys(rooms).map(roomUID => (
        <Col key={roomUID} xl={4} lg={12}>
            <RecentlyAccessedRoomCard room={rooms[roomUID]}/>
        </Col>
    ));
};

const RecentlyAccessRoomsSection = props => {

    const {userInfo, reloadUserInfo} = useUser();
    const [loading, setLoading] = useState(true);
    const {title} = props;

    useEffect(() => {
        const handle = async () => {
            setLoading(true);
            await reloadUserInfo()
            setLoading(false);
        };
        handle();
    }, []);

    if (loading) {
        return (
            <Centered>
                <LoadingSpinner />
            </Centered>
        );
    }

    return (
        <Container fluid className={classes.raSection}>
            <h1 className={classes.raSectionTitle}>{title}</h1>
            <Row>
                {Object.keys(userInfo?.recentRooms || {}).length === 0 && <span className={classes.noRoomsPlaceholder}>No Recent Rooms</span>}
                {userInfo?.recentRooms && renderCard(userInfo.recentRooms)}
            </Row>
        </Container>
    );
};

export default RecentlyAccessRoomsSection;