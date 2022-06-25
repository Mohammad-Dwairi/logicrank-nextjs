
import classes from './styles.module.scss';
import Image from "next/image";
import {useAuth} from "../../context/AuthContext";

const MessageCard = props => {

    const {uid} = useAuth().currentUser;

    const {message, senderUser} = props;
    const isOwner = uid === message.sender;


    return (
        <div className={isOwner ? classes.messagePrimaryCardContainer : classes.messageSecondaryCardContainer}>
            <div className={classes.messageSenderImg}>
                <Image src={(senderUser && senderUser.profilePicture) || require('../../public/default-user.png')} width={40} height={40} />
            </div>
            <div className={classes.messageBody}>{message.text}</div>
        </div>
    );
};
export default MessageCard;