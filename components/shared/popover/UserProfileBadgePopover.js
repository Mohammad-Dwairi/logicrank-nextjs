import PopoverContainer from "./PopoverContainer";
import Link from "next/link";
import {userBadgePopoverOptions} from "../../../utils/UserBadgePopoverOptions";
import UserProfileBadge from "../UserProfileBadge";

import classes from './styles.module.scss';
import {useAuth} from "../../../context/AuthContext";

const UserOptionsPopoverContent = props => {

    const {options} = props;
    const {currentUser, userInfo} = useAuth();

    return (
        <div className={classes.popoverContentContainer}>
            <Link href={`/profile/${currentUser.uid}`} passHref>
                <a className={classes.title}>
                    {userInfo.fullName}
                </a>
            </Link>
            <Link href={`/profile/${currentUser.uid}`} passHref>
                <div className={classes.option}>Profile Settings</div>
            </Link>
            <Link href={`/room/new`} passHref>
                <div className={classes.option}>Create New Room</div>
            </Link>
            <Link href={`/profile/${currentUser.uid}/rooms`} passHref>
                <div className={classes.option}>My Rooms</div>
            </Link>
            <Link href={`/logout`} passHref>
                <div className={classes.option}>Logout</div>
            </Link>
        </div>
    );
};

const UserProfileBadgePopover = props => {

    const {userName, imageLink} = props;


    return (
        <PopoverContainer
            content={<UserOptionsPopoverContent options={userBadgePopoverOptions}/>}
            positions={['bottom']}
        >
            <div> {/* This div is necessary to position the popover correctly ... I DON'T KNOW WHY */}
                <UserProfileBadge userName={userName} imageLink={imageLink}/>
            </div>
        </PopoverContainer>
    );
};

export default UserProfileBadgePopover;