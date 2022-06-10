import {withProtected} from "../../hoc/RouteAuth";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import UsersMessagesList from "../../components/messages-page/UsersMessagesList";
import MessagesArea from "../../components/messages-page/MessagesArea";
import {useRouter} from "next/router";
import {useCallback, useEffect, useState} from "react";
import {MESSAGES_COLLECTION, USERS_COLLECTION} from "../../firebase/constants/COLLECTIONS";
import {useAuth} from "../../context/AuthContext";
import LoadingView from "../../hoc/LoadingView";
import {arrayUnion, collection, doc, onSnapshot, query, setDoc, updateDoc, where} from "firebase/firestore";
import {db} from "../../firebase/firebase";


const MessagesPage = props => {

    const {receiverId} = useRouter().query;

    const {uid} = useAuth().currentUser;

    const [userInfo, setUserInfo] = useState(null);
    const [receiverUser, setReceiverUser] = useState(null);

    const [chat, setChat] = useState(null);

    // console.log('CHAT UPDATED')
    const fetchCurrentAndReceiverInfo = useCallback(() => {
        onSnapshot(query(collection(db, USERS_COLLECTION), where("__name__", "==", uid)), snapshot => {
            if (snapshot.docs[0])
                setUserInfo({id: snapshot.docs[0].id, ...snapshot.docs[0].data()});
        });
        onSnapshot(query(collection(db, USERS_COLLECTION), where("__name__", "==", receiverId)), snapshot => {
            if (snapshot.docs[0])
                setReceiverUser({id: snapshot.docs[0].id, ...snapshot.docs[0].data()});
        });
    }, []);


    // const fetchCurrentAndReceiverInfo = useCallback(async () => {
    //     console.log("FETCH USERS IS CALLED")
    //     const userInfo = await fbQueryDocByUID(USERS_COLLECTION, uid);
    //     const receiverUser = await fbQueryDocByUID(USERS_COLLECTION, receiverId);
    //     setUserInfo(userInfo)
    //     setReceiverUser(receiverUser);
    // }, [receiverId, uid]);


    // const fetchActualMessagesUsersInfoFromIDs = useCallback(() => {
    //     console.log("FETCH MESSAGED USERS IS CALLED")
    //
    //     if (userInfo && userInfo.messagedUsers) {
    //         let {messagedUsers} = userInfo;
    //         if (messagedUsers && messagedUsers.length !== 0) {
    //             const messagedUsersIDs = messagedUsers.map(user => user.id);
    //             const messagedUsersQuery = query(collection(db, USERS_COLLECTION), where("__name__", 'in', messagedUsersIDs));
    //
    //             onSnapshot(messagedUsersQuery, snapshot => {
    //                 const fetchedMessagedUsers = [];
    //                 snapshot.forEach(doc => {
    //                     const lastMessage = messagedUsers.find(user => user.id === doc.id)?.lastMessage;
    //                     fetchedMessagedUsers.push({
    //                         id: doc.id,
    //                         ...doc.data(),
    //                         lastMessage: lastMessage || null
    //                     });
    //                 });
    //                 // setMessagedUsers(fetchedMessagedUsers);
    //             });
    //         }
    //     }
    // }, []);


    const getChatId = () => {
        return uid > receiverUser.id ? `${uid + receiverUser.id}` : `${receiverUser.id + uid}`;
    };

    const getPreviousChatIndex = () => {

        let index = -1;
        if (userInfo.messagedUsers) {
            index = userInfo.messagedUsers.findIndex(user => (user.id === receiverId || user.id === uid));
        }
        return index;
    };


    const fetchChat = () => {
        if (uid && receiverUser) {
            const chatId = getChatId();
            onSnapshot(query(collection(db, MESSAGES_COLLECTION), where('__name__', '==', chatId)), snapshot => {
                const chat = snapshot.docs[0].data().chat;
                chat && setChat(chat);
            });
        }
    };


    const updateChat = async message => {

        const chatDocRef = doc(db, MESSAGES_COLLECTION, getChatId());
        const isPreviousChatExists = getPreviousChatIndex() !== -1;
        if (isPreviousChatExists) {
            await updateDoc(chatDocRef, {chat: arrayUnion(message)});
        } else {
            await setDoc(chatDocRef, {chat: arrayUnion(message)});
        }
    };

    const updateMessagedUsers = async lastMessage => {

        const previousChatIndex = getPreviousChatIndex();
        if (previousChatIndex !== -1) {
            userInfo.messagedUsers[previousChatIndex].lastMessage = lastMessage;
            await updateDoc(doc(db, USERS_COLLECTION, uid), {messagedUsers: userInfo.messagedUsers});
            await updateDoc(doc(db, USERS_COLLECTION, receiverId), {messagedUsers: userInfo.messagedUsers});
        } else {
            const receiverMessageCardInfo = {id: receiverId, lastMessage: lastMessage};
            const senderMessageCardInfo = {id: uid, lastMessage: lastMessage};
            await updateDoc(doc(db, USERS_COLLECTION, uid), {messagedUsers: arrayUnion(receiverMessageCardInfo)});
            await updateDoc(doc(db, USERS_COLLECTION, receiverId), senderMessageCardInfo);
        }
    }


    const onMessageSend = async message => {
        await updateChat(message);
        await updateMessagedUsers(message);
    };

    useEffect(() => {
        fetchCurrentAndReceiverInfo();
        // fetchActualMessagesUsersInfoFromIDs();
        fetchChat();
    }, [fetchChat, fetchCurrentAndReceiverInfo]);


    if (!userInfo) {
        return <LoadingView/>;
    }

    return (
        <Container>
            <Row>
                <Col lg={3}>
                    <UsersMessagesList messagedUsers={userInfo.messagedUsers || []}/>
                </Col>
                <Col>
                    <MessagesArea chat={chat} receiverUser={receiverUser} onMessageSend={onMessageSend}/>
                </Col>
            </Row>
        </Container>
    );
};

export default withProtected(MessagesPage);