import {Table} from "react-bootstrap";
import classes from './styles.module.scss';

const LectureInfo = ({lecture}) => {

    if (!lecture) return null;

    const {title, link, startTime, endTime} = lecture;

    return (
        <Table striped bordered hover className={classes.infoTable}>
            <tbody>
            <tr>
                <th>Lecture Title</th>
                <td>{title}</td>
            </tr>
            <tr>
                <th>Join Link</th>
                <td><a href={link} target='_blank' rel="noreferrer">{link}</a></td>
            </tr>
            <tr>
                <th>Start Time</th>
                <td>{startTime}</td>
            </tr>
            <tr>
                <th>End Time</th>
                <td>{endTime}</td>
            </tr>
            </tbody>
        </Table>
    );
};

export default LectureInfo;