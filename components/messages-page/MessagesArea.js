import classes from './styles.module.scss';
import Image from "next/image";
import UserOnlineStatus from "../shared/UserOnlineStatus";
import MessageCard from "./MessageCard";
import {CgAttachment} from "react-icons/cg";
import {memo, useLayoutEffect, useRef, useState} from "react";
import {AiOutlineSend} from "react-icons/ai";
import {useAuth} from "../../context/AuthContext";
import LoadingView from "../../hoc/LoadingView";
import {useRouter} from "next/router";

const MIN_TEXTAREA_HEIGHT = 32;

const renderChat = (chat, users) => chat.map((message, i) => (
    <MessageCard key={i} message={message} senderUser={users[chat[i].sender]}/>
));

const MessagesArea = props => {

    const {chat, room, users, onMessageSend} = props;

    const textareaRef = useRef(null);
    const [value, setValue] = useState("");

    const onChange = (event) => setValue(event.target.value);

    useLayoutEffect(() => {
        // Reset height - important to shrink on delete
        textareaRef.current.style.height = "inherit";
        // Set height
        textareaRef.current.style.height = `${Math.max(
            textareaRef.current.scrollHeight,
            MIN_TEXTAREA_HEIGHT
        )}px`;
    }, [value]);


    return (
        <section className={classes.messagesAreaContainer}>
            <header>
                <div className={classes.imgContainer}>
                    <Image src={room.coverImageURL || require('../../public/dreamer.svg')} width={50}
                           height={50}/>
                </div>
                <div className={classes.userInfo}>
                    <div>{room.roomName}</div>
                    {/*<UserOnlineStatus isOnline={receiverUser.isOnline}/>*/}
                </div>
            </header>
            <main>
                {renderChat(chat || [], users)}
            </main>
            <footer>
                <CgAttachment size={23}/>
                <textarea rows={1} placeholder='Write your message' onChange={onChange} ref={textareaRef}
                          style={{minHeight: MIN_TEXTAREA_HEIGHT, resize: "none"}} value={value}/>
                <AiOutlineSend size={25} onClick={() => {
                    onMessageSend(value);
                    setValue('');
                }}/>
            </footer>
        </section>
    );
};

export default memo(MessagesArea);