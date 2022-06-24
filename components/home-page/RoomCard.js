
import classes from './styles.module.scss';
import Image from "next/image";
import {useRouter} from "next/router";

const RoomCard = props => {

    const {room, roomUID, hidePrice} = props;
    const router = useRouter();

    return (
        <div className={classes.roomCardContainer} onClick={() => router.push(`/room/${roomUID}`)}>
            <div className={classes.roomCardImgContainer}>
                <Image src={room.coverImageURL || require('../../public/dreamer.svg')} alt='room card' className={classes.roomCardImg} width={200} height={200}/>
            </div>
            <div className={classes.roomCardBody}>
                <h1 className={classes.roomCardTitle}>{room?.roomName}</h1>
                <p className={classes.roomCardDescription}>{room?.roomDescription}</p>
            </div>
            <div className={classes.roomCardFooter}>
                <h3 className={classes.roomCardInstructor}>By {room?.roomInstructor}</h3>
                {hidePrice || <h3 className={classes.roomCardPrice}>${room?.roomPrice}</h3>}
            </div>
        </div>
    );
};

export default RoomCard;