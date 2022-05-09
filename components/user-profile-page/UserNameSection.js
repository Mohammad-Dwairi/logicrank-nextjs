import {IoLocation} from "react-icons/io5";

import classes from './styles.module.scss';
import Link from "next/link";
import {RiMessageFill} from "react-icons/ri";


const UserNameSection = props => {


    return (
        <div className={classes.userNameSection}>
            <h1 className={classes.userName}>Mohammad Dwairi</h1>
            <div className={classes.locationContainer}>
                <IoLocation/>
                <span>New York</span>
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