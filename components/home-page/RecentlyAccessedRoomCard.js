import classes from './styles.module.scss';
import Image from "next/image";
import Link from "next/link";

const RecentlyAccessedRoomCard = props => {

    const {room, roomUID} = props;

    return (
        <Link href={`/room/${roomUID}`}>
            <a className={classes.raCardContainer}>
                <div className={classes.raCardImgContainer}>
                    <Image className={classes.raCardImg} src={room.coverImageURL || require('../../public/dreamer.svg')} alt='room image' width={200} height={200}/>
                </div>
                <div className={classes.raCardBody}>
                    <h1 className={classes.raCardTitle}>{room?.roomName}</h1>
                    <h3 className={classes.raCardInstructor}>By {room?.roomInstructor}</h3>
                    <p className={classes.raCardActivity}>No recent activities</p>
                </div>
            </a>
        </Link>
    );
};

export default RecentlyAccessedRoomCard;