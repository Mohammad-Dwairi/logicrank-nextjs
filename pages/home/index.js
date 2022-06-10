import RecentlyVisitedRoomsSection from "../../components/home-page/RecentlyVisitedRoomsSection";
import RoomsSection from "../../components/home-page/RoomsSection";
import {withProtected} from "../../hoc/RouteAuth";
import Container from "react-bootstrap/Container";
import ToolsSection from "../../components/home-page/ToolsSection";
import {useCallback, useEffect, useState} from "react";
import {fbGetAllDocs, fbQueryDocs} from "../../firebase/functions/firestore-docs-functions";
import LoadingView from "../../hoc/LoadingView";
import {useAuth} from "../../context/AuthContext";
import {ROOMS_COLLECTION} from "../../firebase/constants/COLLECTIONS";
import {collection, query, where} from "firebase/firestore";
import {db} from "../../firebase/firebase";

const HomePage = () => {

    const {userInfo} = useAuth();

    const [rooms, setRooms] = useState({});
    const [recentRooms, setRecentRooms] = useState({});

    const [isLoading, setIsLoading] = useState(true);

    const fetchRooms = useCallback(async () => {
        const fetchedRooms = await fbGetAllDocs(ROOMS_COLLECTION);
        setRooms(fetchedRooms);
    }, []);

    const fetchRecentlyVisitedRooms = useCallback(async () => {
        if (userInfo) {
            const recentRoomsIDs = userInfo.recentRooms;
            if (!recentRoomsIDs) return;
            const roomsRef = collection(db, ROOMS_COLLECTION);
            const q = query(roomsRef, where('__name__', 'in', recentRoomsIDs));
            const fetchedRecentRooms = await fbQueryDocs(q);
            if (fetchedRecentRooms)
                setRecentRooms(fetchedRecentRooms);
        }
    }, [userInfo]);

    useEffect(() => {
        fetchRooms().then(fetchRecentlyVisitedRooms).then(() => setIsLoading(false));
    }, [fetchRecentlyVisitedRooms, fetchRooms]);

    if (isLoading) return <LoadingView isLoading={true}/>

    return (
        <Container>
            <RecentlyVisitedRoomsSection recentRooms={recentRooms} title='Recently Visited Rooms'/>
            <ToolsSection title='Assets & Utilities'/>
            <RoomsSection rooms={rooms} title='All Rooms'/>
        </Container>
    );
};

export default withProtected(HomePage);