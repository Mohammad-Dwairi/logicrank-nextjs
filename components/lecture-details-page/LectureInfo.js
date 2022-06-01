import {Table} from "react-bootstrap";
import classes from './styles.module.scss';

const LectureInfo = ({lecture}) => {

    if (!lecture) return null;

    const {title, link, startTime, endTime} = lecture;

    return (
        <div className={classes.lectureInfoSection}>
            <div>
                <h1>Lecture Title</h1>
                <span>{title}</span>
            </div>
            <div>
                <h1>Meeting Link</h1>
                <a href={link}>{link}</a>
            </div>
            <div>
                <h1>Start Time</h1>
                <span>{startTime}</span>
            </div>
            <div>
                <h1>End Time</h1>
                <span>{endTime}</span>
            </div>
        </div>
    );
};

export default LectureInfo;