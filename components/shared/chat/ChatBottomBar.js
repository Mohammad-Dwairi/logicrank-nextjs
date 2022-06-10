import classes from './styles.module.scss';
import QuickChat from "./QuickChat";

const ChatBottomBar = props => {


    return (
        <div className={classes.chatBottomBar}>
            <QuickChat />
        </div>
    );
};

export default ChatBottomBar;