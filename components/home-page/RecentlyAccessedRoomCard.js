import classes from './styles.module.scss';
import Image from "next/image";

const RecentlyAccessedRoomCard = props => {

    const {room} = props;
    return (
        <div className={classes.raCardContainer}>
            <div className={classes.raCardImgContainer}>
                <Image className={classes.raCardImg} src={require('../../public/pc.jpg')} alt='room image'/>
            </div>
            <div className={classes.raCardBody}>
                <h1 className={classes.raCardTitle}>{room?.name}</h1>
                <h3 className={classes.raCardInstructor}>By {room?.instructor}</h3>
                <p className={classes.raCardActivity}>No recent activities</p>
            </div>
        </div>
    );
};

export default RecentlyAccessedRoomCard;