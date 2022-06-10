import classes from './styles.module.scss';
import Link from "next/link";
import {useRouter} from "next/router";

const LectureCard = props => {

    const {rid} = useRouter().query;

    const {lecture, num, id} = props;

    return (
        <div className={classes.lectureCard}>
            <div className={classes.lectureNum}>#{num}</div>
            <div className={classes.lectureCardInfo}>
                <div className={classes.headerContainer}>
                    <Link href={lecture.link} passHref>
                        <a>{lecture?.title}</a>
                    </Link>
                    <div>{lecture?.dateCreated && new Date(lecture?.dateCreated).toDateString()}</div>
                </div>
                <Link href={`/room/${rid}/lecture/${id}`} passHref className={classes.btnContainer}>
                    <a>Go to Details</a>
                </Link>
            </div>
        </div>
    );
};

export default LectureCard;