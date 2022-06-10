import PopoverContainer from "./PopoverContainer";
import {BiChat} from "react-icons/bi";

import classes from './styles.module.scss';
import Link from "next/link";

const renderChats = chats => (
    chats.slice(0, 4).map(c => (
        <div key={c.id} className={classes.chatListItem}>
            <div className={classes.chatSender}>
                {c.sender}
                <span className={classes.msgTime}>{c.ago} hrs ago</span>
            </div>
            <div className={classes.msg}>{c.message}</div>
        </div>
    ))
);

const ChatPopoverContent = props => {

    const {chats} = props;

    return (
        <div className={classes.popoverContentContainer}>
            <div className={classes.title}>Chat</div>
            {chats && chats.length !== 0 ? renderChats(chats) :
                <span className="text-muted">No recent conversations</span>}
            {chats && chats.length !== 0 && <Link href='#' passHref>
                <a className={classes.footerText}>See All</a>
            </Link>}
        </div>
    );
};

const ChatPopover = props => {

    const chats = [
        {id: '1', sender: 'Mohammad', message: 'Hello World!', ago: '2'},
        {id: '1', sender: 'Mohammad', message: 'Hello World!', ago: '2'},

    ];

    return (
        <PopoverContainer content={<ChatPopoverContent chats={chats}/>} positions={['bottom']}>
            <div>
                <BiChat className={classes.popoverIcon} size={22}/>
            </div>
        </PopoverContainer>
    );
};

export default ChatPopover;