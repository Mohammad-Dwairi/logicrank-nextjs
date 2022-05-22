import {IoLocation} from "react-icons/io5";

import classes from './styles.module.scss';
import Link from "next/link";
import {RiMessageFill} from "react-icons/ri";
import EditableText from "../shared/EditableText";
import {useState} from "react";
import {fbUpdateDocByUID} from "../../firebase/functions/firestore-docs-functions";
import {USERS_COLLECTION} from "../../firebase/constants/COLLECTIONS";
import {useAuth} from "../../context/AuthContext";


const initState = (val) => val ? val : '';

const UserNameSection = ({userInfo}) => {

    const [fullName, setFullName] = useState(initState(userInfo.fullName));
    const [location, setLocation] = useState(initState(userInfo.location));

    const {currentUser} = useAuth();

    return (
        <div className={classes.userNameSection}>
            <h1 className={classes.userName}>
                <EditableText
                    required
                    defaultValue={userInfo.fullName}
                    value={fullName}
                    placeholder='Press to add user name'
                    onChange={text => setFullName(text)}
                    onFinish={() => fbUpdateDocByUID(USERS_COLLECTION, currentUser.uid, {fullName})}
                />
            </h1>
            <div className={classes.locationContainer}>
                <IoLocation/>
                <EditableText
                    name='location'
                    value={location}
                    placeholder='Press to add location'
                    onChange={text => setLocation(text)}
                    onFinish={() => fbUpdateDocByUID(USERS_COLLECTION, currentUser.uid, {location})}
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