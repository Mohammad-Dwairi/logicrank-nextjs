import classes from './styles.module.scss';
import Image from "next/image";


const UserProfileBadge = props => {
    const {imageLink} = props;

    return (
        <span className={classes.userProfileBadge}>
            <Image src={imageLink || require('../../public/default-user.png')} alt='profile picture' width={10000} height={10000}/>
        </span>
    );
};

export default UserProfileBadge;