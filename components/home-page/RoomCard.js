
import classes from './styles.module.scss';
import Image from "next/image";

const RoomCard = props => {

    const {room} = props;

    return (
        <div className={classes.roomCardContainer}>
            <div className={classes.roomCardImgContainer}>
                <Image src={require('../../public/pc.jpg')} alt='room card' className={classes.roomCardImg}/>
            </div>
            <div className={classes.roomCardBody}>
                <h1 className={classes.roomCardTitle}>{room?.name}</h1>
                <p className={classes.roomCardDescription}>{room?.description}</p>
            </div>
            <div className={classes.roomCardFooter}>
                <h3 className={classes.roomCardInstructor}>By {room?.instructor}</h3>
                <h3 className={classes.roomCardPrice}>${room?.price}</h3>
            </div>
        </div>
    );
};

export default RoomCard;