import classes from './styles.module.scss';
import Image from "next/image";
import UserOnlineStatus from "../shared/UserOnlineStatus";
import MessageCard from "./MessageCard";
import {CgAttachment} from "react-icons/cg";
import {memo, useLayoutEffect, useRef, useState} from "react";
import {AiOutlineSend} from "react-icons/ai";
import {useAuth} from "../../context/AuthContext";
import LoadingView from "../../hoc/LoadingView";

const MIN_TEXTAREA_HEIGHT = 32;

const renderChat = (chat, receiverUser) => chat.map((message, i) => (
    <MessageCard key={i} message={message} receiverUser={receiverUser}/>
));

const MessagesArea = props => {

    const {chat,receiverUser, onMessageSend} = props;

    const textareaRef = useRef(null);
    const [value, setValue] = useState("");
    const onChange = (event) => setValue(event.target.value);

    const {uid} = useAuth().currentUser;

    useLayoutEffect(() => {
        if (receiverUser) {
            // Reset height - important to shrink on delete
            textareaRef.current.style.height = "inherit";
            // Set height
            textareaRef.current.style.height = `${Math.max(
                textareaRef.current.scrollHeight,
                MIN_TEXTAREA_HEIGHT
            )}px`;
        }
    }, [value]);

    const sendMessageHandler = () => {
        const messageObj = {
            from: uid,
            to: receiverUser.id,
            dateSent: +new Date(),
            text: value,
        };
        onMessageSend(messageObj);
    };

    if (!receiverUser) {
        return (
            <LoadingView isLoading={true}/>
        );
    }

    return (
        <section className={classes.messagesAreaContainer}>
            <header>
                <div className={classes.imgContainer}>
                    <Image src={receiverUser?.profileImage || require('../../public/profile.jpeg')} width={50} height={50}/>
                </div>
                <div className={classes.userInfo}>
                    <div>{receiverUser.fullName}</div>
                    <UserOnlineStatus isOnline={receiverUser.isOnline}/>
                </div>
            </header>
            <main>
                {renderChat(chat || [], receiverUser)}
            </main>
            <footer>
                <CgAttachment size={23}/>
                <textarea rows={1} placeholder='Write your message' onChange={onChange} ref={textareaRef}
                          style={{minHeight: MIN_TEXTAREA_HEIGHT, resize: "none"}} value={value}/>
                <AiOutlineSend size={25} onClick={sendMessageHandler}/>
            </footer>
        </section>
    );
};

export default memo(MessagesArea);