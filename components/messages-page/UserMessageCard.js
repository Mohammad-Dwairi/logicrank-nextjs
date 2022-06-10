import classes from './styles.module.scss';
import Image from "next/image";


const UserMessageCard = props => {

    const messagedUser = props.user;

    // console.log("USERRRR", messagedUser)
    return (
        <div className={`${classes.userMessageCard} ${classes.userMessageCardActive}`}>
            <div className={classes.imgContainer}>
                <Image src={messagedUser?.realtimeData?.profileImage || require('../../public/profile.jpeg')} width={100} height={100}/>
            </div>
            <div className={classes.userMessageContent}>
                <div>
                    <span>{messagedUser.fullName}</span>
                    <span>{messagedUser.realtimeData?.dateSent && new Date(messagedUser.realtimeData.dateSent)}</span>
                </div>
                <div>{messagedUser?.lastMessage?.text}</div>
            </div>
        </div>
    );
};

export default UserMessageCard;