import {withProtected} from "../../../hoc/RouteAuth";
import {WithRoomSideBar} from "../../../hoc/WithRoomSideBar";
import Container from "react-bootstrap/Container";
import MessagesArea from "../../../components/messages-page/MessagesArea";
import {useCallback, useEffect, useState} from "react";
import {arrayUnion, collection, doc, onSnapshot, query, setDoc, updateDoc, where} from "firebase/firestore";
import {db} from "../../../firebase/firebase";
import {MESSAGES_COLLECTION, ROOMS_COLLECTION, USERS_COLLECTION} from "../../../firebase/constants/COLLECTIONS";
import {useRouter} from "next/router";
import {useAuth} from "../../../context/AuthContext";
import {fbQueryDocByUID, fbQueryDocs} from "../../../firebase/functions/firestore-docs-functions";
import LoadingView from "../../../hoc/LoadingView";


const ChatPage = () => {

    console.log("Rendered")
    const {rid} = useRouter().query;
    const {currentUser, userInfo} = useAuth();

    const [chat, setChat] = useState([]);
    const [users, setUsers] = useState({});
    const [room, setRoom] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const unsub = onSnapshot(query(collection(db, MESSAGES_COLLECTION), where('__name__', '==', rid)), snapshot => {
            const chat = snapshot.docs[0]?.data().chat;
            chat && setChat(chat);
        });

        // return unsub();
    }, [rid]);


    useEffect(() => {
        const fetchRoom = async () => {
            const fetchedRoom = await fbQueryDocByUID(ROOMS_COLLECTION, rid);
            if (fetchedRoom) {
                setRoom(fetchedRoom);
                setIsLoading(false);
            }
        };
        fetchRoom();
    }, [rid]);

    useEffect(() => {
        const fetchUsers = async () => {
            const chatUsersUIDs = chat.map(msg => msg.sender);
            if (chatUsersUIDs && chatUsersUIDs.length !== 0) {
                const q = query(collection(db, USERS_COLLECTION), where("__name__", "in", chatUsersUIDs));
                const fetchedUsers = await fbQueryDocs(q);
                if (fetchedUsers)
                    setUsers(fetchedUsers);
            }
        };
        fetchUsers();
    }, [chat]);

    const onMessageSend = useCallback(async (msgText) => {

        if (!msgText || msgText.trim().length === 0) return;

        const message = {
            sender: currentUser.uid,
            roomId: rid,
            time: +new Date(),
            text: msgText
        };

        try {
            await updateDoc(doc(db, MESSAGES_COLLECTION, rid), {chat: arrayUnion(message)});
        } catch (e) {
            await setDoc(doc(db, MESSAGES_COLLECTION, rid), {chat: [message]});
        }

    }, [currentUser.uid, rid]);

    if (isLoading) return <LoadingView/>;

    return (
        <WithRoomSideBar>
            <Container style={{maxWidth: '50rem'}}>
                <MessagesArea users={users} room={room} chat={chat} onMessageSend={onMessageSend}/>
            </Container>
        </WithRoomSideBar>
    );
};

export default withProtected(ChatPage);