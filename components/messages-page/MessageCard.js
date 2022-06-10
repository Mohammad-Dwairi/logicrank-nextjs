
import classes from './styles.module.scss';
import Image from "next/image";
import {useAuth} from "../../context/AuthContext";

const MessageCard = props => {

    const {uid} = useAuth().currentUser;

    const {message, receiverUser} = props;
    const isOwner = uid === message.from;

    return (
        <div className={isOwner ? classes.messagePrimaryCardContainer : classes.messageSecondaryCardContainer}>
            <div className={classes.messageSenderImg}>
                <Image src={receiverUser.profileImage || require('../../public/profile.jpeg')} width={40} height={40} />
            </div>
            <div className={classes.messageBody}>{message.text}</div>
        </div>
    );
};
export default MessageCard;