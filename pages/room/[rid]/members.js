import {withProtected} from "../../../hoc/RouteAuth";
import Container from "react-bootstrap/Container";
import {useEffect, useState} from "react";
import {collection, onSnapshot, query, where} from "firebase/firestore";
import {db} from "../../../firebase/firebase";
import {ROOMS_COLLECTION, USERS_COLLECTION} from "../../../firebase/constants/COLLECTIONS";
import {fbQuerySingleDoc} from "../../../firebase/functions/firestore-docs-functions";
import {useRouter} from "next/router";
import RoomMemberCard from "../../../components/members-page/RoomMemberCard";
import {WithRoomSideBar} from "../../../hoc/WithRoomSideBar";


const MembersPage = () => {

    const {rid} = useRouter().query;
    const [members, setMembers] = useState([]);
    const [room, setRoom] = useState(null);

    useEffect(() => {
        const roomQuery = query(collection(db, ROOMS_COLLECTION), where('__name__', '==', rid));
        fbQuerySingleDoc(roomQuery).then(room => {
            setRoom(room)
            const membersQuery = query(collection(db, USERS_COLLECTION), where('__name__', 'in', room.members));
            onSnapshot(membersQuery, snapshot => {
                let fetchedMembers = [];
                snapshot.forEach(doc => fetchedMembers.push({id: doc.id, ...doc.data()}));
                setMembers(fetchedMembers);
            });
        });

    }, []);

    return (
        <WithRoomSideBar>
            <Container className='mt-5'>
                {members.map(m => <RoomMemberCard key={m.id} member={m} room={room}/>)}
            </Container>
        </WithRoomSideBar>

    );


};

export default withProtected(MembersPage);