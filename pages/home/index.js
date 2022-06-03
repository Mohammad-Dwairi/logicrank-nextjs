import RecentlyAccessRoomsSection from "../../components/home-page/RecentlyAccessRoomsSection";
import RoomsSection from "../../components/home-page/RoomsSection";
import {withProtected} from "../../hoc/RouteAuth";
import Container from "react-bootstrap/Container";
import ToolsSection from "../../components/home-page/ToolsSection";
import {useSelector} from "react-redux";
import {useCallback, useEffect, useState} from "react";
import {fbGetAllDocs} from "../../firebase/functions/firestore-docs-functions";
import LoadingView from "../../hoc/LoadingView";

const HomePage = () => {

    const userInfo = useSelector(state => state.userCtx.userInfo);
    const [rooms, setRooms] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    const fetchRooms = useCallback(async () => {
        const fetchedRooms = await fbGetAllDocs('rooms');
        setRooms(fetchedRooms);
        setIsLoading(false);
    }, []);

    useEffect(() => {
        fetchRooms(); // consider update recently visited Rooms
    }, [fetchRooms]);


    return (
        <LoadingView isLoading={isLoading}>
            <Container>
                <RecentlyAccessRoomsSection recentRoomsUIDs={userInfo?.recentRooms} title='Recently Accessed Rooms'/>
                <ToolsSection title='Assets & Utilities'/>
                <RoomsSection rooms={rooms} title='All Rooms'/>
            </Container>
        </LoadingView>
    );
};

export default withProtected(HomePage);