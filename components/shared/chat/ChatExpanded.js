
import classes from './styles.module.scss';
import UserProfileBadge from "../UserProfileBadge";
import {AiOutlineMinus, AiOutlineSend} from "react-icons/ai";
import {GrAttachment} from "react-icons/gr";


const ChatExpanded = props => {

    const {onCollapse} = props;

    return (
        <div className={classes.chatExpanded}>
            <div className={classes.chatHeader}>
                <div className={classes.chatUserContainer}>
                    <UserProfileBadge />
                    <div>Mohammad Dwairi</div>
                </div>
                <AiOutlineMinus size={20} className={classes.chatUserCollapseIcon} onClick={onCollapse}/>
            </div>
            <div className={classes.chatArea}>

            </div>
            <div className={classes.chatExpandedFooter}>
                <GrAttachment size={17} />
                <input type='text'/>
                <AiOutlineSend size={20} />
            </div>
        </div>
    );
};

export default ChatExpanded;