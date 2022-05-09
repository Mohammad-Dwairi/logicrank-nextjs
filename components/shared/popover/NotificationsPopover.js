import PopoverContainer from "./PopoverContainer";
import {IoMdNotificationsOutline} from "react-icons/io";

import classes from './styles.module.scss';


const renderNotifications = notifications => (
    notifications.map(notification => (
        <div key={notification.id} className={classes.notificationListItem}>
            {notification.content}
        </div>
    ))
);

const NotificationsPopoverContent = props => {

    const {notifications} = props;

    return (
        <div className={classes.popoverContentContainer}>
            <div className={classes.title}>
                Notifications
            </div>
            {notifications && notifications.length !== 0 ? renderNotifications(notifications) :
                <span className='text-muted'>It is quite right now</span>}
        </div>
    );
};

const NotificationsPopover = props => {

    const notifications = [
        {id: 1, content: 'Mohammad Dwairi posted in JPC Level 1'},
        {id: 2, content: 'Mohammad Dwairi posted in JPC Level 1'},
        {id: 3, content: 'Mohammad Dwairi posted in JPC Level 1'},
    ]

    return (
        <PopoverContainer
            content={<NotificationsPopoverContent notifications={notifications}/>}
            positions={['bottom']}
        >
            <div>
                <IoMdNotificationsOutline className={classes.popoverIcon}/>
            </div>
        </PopoverContainer>

    );
};

export default NotificationsPopover;