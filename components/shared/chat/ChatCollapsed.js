import classes from './styles.module.scss';
import UserProfileBadge from "../UserProfileBadge";

const ChatCollapsed = props => {

    const {onClick} = props;

    return (
        <div className={classes.chatHeader} onClick={onClick}>
            <div className={classes.chatUserContainer}>
                <UserProfileBadge/>
                <div>Mohammad Dwairi</div>
            </div>
        </div>
    );
};

export default ChatCollapsed;