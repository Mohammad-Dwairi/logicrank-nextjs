import PopoverContainer from "./PopoverContainer";
import Link from "next/link";
import {userBadgePopoverOptions} from "../../../utils/UserBadgePopoverOptions";
import UserProfileBadge from "../UserProfileBadge";

import classes from './styles.module.scss';
import {useAuth} from "../../../context/AuthContext";
import {useSelector} from "react-redux";

const UserOptionsPopoverContent = props => {

    const {options} = props;
    const userInfo = useSelector(state => state.userCtx.userInfo);
    const {currentUser} = useAuth();

    return (
        <div className={classes.popoverContentContainer}>
            <Link href={`/profile/${currentUser.uid}`} passHref>
                <a className={classes.title}>
                    {userInfo.fullName}
                </a>
            </Link>

            {options.map((option, index) => (
                <Link href={option.link} key={index} passHref>
                    <div className={classes.option}>{option.label}</div>
                </Link>
            ))}
        </div>
    );
};

const UserProfileBadgePopover = props => {

    const {userName} = props;


    return (
        <PopoverContainer
            content={<UserOptionsPopoverContent options={userBadgePopoverOptions}/>}
            positions={['bottom']}
        >
            <div> {/* This div is necessary to position the popover correctly ... I DON'T KNOW WHY */}
                <UserProfileBadge userName={userName}/>
            </div>
        </PopoverContainer>
    );
};

export default UserProfileBadgePopover;