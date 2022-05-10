import {IoLocation} from "react-icons/io5";

import classes from './styles.module.scss';
import Link from "next/link";
import {RiMessageFill} from "react-icons/ri";
import EditableText from "../shared/EditableText";
import {userInfoChangeHandler} from "../../store/actions/user-profile-actions";
import {useState} from "react";


const initState = (val) => val ? val : '';

const UserNameSection = ({userInfo}) => {

    const [fullName, setFullName] = useState(initState(userInfo.fullName));
    const [location, setLocation] = useState(initState(userInfo.location));

    return (
        <div className={classes.userNameSection}>
            <h1 className={classes.userName}>
                <EditableText
                    required
                    defaultValue={userInfo.fullName}
                    value={fullName}
                    placeholder='Press to add user name'
                    onChange={text => setFullName(text)}
                    onFinish={() => userInfoChangeHandler('fullName', fullName)}
                />
            </h1>
            <div className={classes.locationContainer}>
                <IoLocation/>
                <EditableText
                    name='location'
                    value={location}
                    placeholder='Press to add location'
                    onChange={text => setLocation(text)}
                    onFinish={() => userInfoChangeHandler('location', location)}
                />
            </div>
            <div className={classes.actions}>
                <Link href='#' passHref>
                    <a className={classes.sendMessage}>
                        <RiMessageFill className={classes.messageIcon}/>
                        <span className={classes.messageLink}>Send Message</span>
                    </a>
                </Link>
                <Link href='#' passHref>
                    <a className={classes.reportUser}>Report User</a>
                </Link>
            </div>
        </div>
    );
};

export default UserNameSection;