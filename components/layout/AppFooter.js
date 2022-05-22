import classes from './styles.module.scss';
import {SiFacebook, SiInstagram, SiLinkedin, SiTwitter} from 'react-icons/si';
import Link from "next/link";

const AppFooter = () => {

    return (
        <footer className={classes.footer}>
            <div className={classes.row}>
                <SiTwitter className={classes.icon}/>
                <SiFacebook className={classes.icon}/>
                <SiInstagram className={classes.icon}/>
                <SiLinkedin className={classes.icon}/>
            </div>
            <div className={classes.row}>
                <Link href='#' passHref><a className={classes.link}>Info</a></Link>
                <Link href='#' passHref><a className={classes.link}>Support</a></Link>
                <Link href='#' passHref><a className={classes.link}>Marketing</a></Link>
            </div>
            <span className={classes.rightsText}>&copy; 2021-2022 LogicRank Inc. All rights reserved</span>
        </footer>
    );
};

export default AppFooter;