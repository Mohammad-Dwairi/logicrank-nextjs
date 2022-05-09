import classes from './styles.module.scss';
import Image from "next/image";


const UserProfileBadge = props => {

    return (
        <span className={classes.userProfileBadge}>
            <Image src={require('../../public/profile.jpeg')} alt='profile picture'/>
        </span>
    );
};

export default UserProfileBadge;