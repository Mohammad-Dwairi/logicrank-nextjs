import Image from "next/image";
import classes from './styles.module.scss';

const ProfilePicture = props => {

    return (
        <div className={classes.profilePictureContainer}>
            <Image src={require('../../public/profile.jpeg')} alt='logo' className={classes.profilePicture}/>
        </div>
    );
};

export default ProfilePicture;