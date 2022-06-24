import {withProtected} from "../../../hoc/RouteAuth";
import Container from "react-bootstrap/Container";
import RoomsSection from "../../../components/home-page/RoomsSection";
import {useEffect, useState} from "react";
import {useAuth} from "../../../context/AuthContext";
import {collection, query, where} from "firebase/firestore";
import {db} from "../../../firebase/firebase";
import {ROOMS_COLLECTION} from "../../../firebase/constants/COLLECTIONS";
import {fbQueryDocs} from "../../../firebase/functions/firestore-docs-functions";


const MyRoomsPage = () => {

    const [myRooms, setMyRooms] = useState({});
    const {userInfo} = useAuth();

    useEffect(() => {
        const handle = async () => {
            const enrolledRooms = userInfo.enrolledRooms;
            if (enrolledRooms && enrolledRooms.length > 0) {
                const q = query(collection(db, ROOMS_COLLECTION), where("__name__", "in", enrolledRooms));
                const fetchedMyRooms = await fbQueryDocs(q);
                if (fetchedMyRooms) {
                    setMyRooms(fetchedMyRooms);
                }
            }
        };
        handle();

    }, [userInfo.enrolledRooms]);

    return (
        <Container className='mt-5'>
            <h2>My Enrolled Rooms</h2>
            <RoomsSection rooms={myRooms} hidePrice/>
        </Container>
    );
};

export default withProtected(MyRoomsPage);