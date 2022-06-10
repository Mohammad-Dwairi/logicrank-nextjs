import classes from './styles.module.scss';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {Table} from "react-bootstrap";

const ProblemInfoSection = props => {

    const {problem} = props;

    return (
        <Row className={classes.infoContainer}>
            <Col sm={12}>
                <a href={problem.link} target='_blank' className={classes.title} rel="noreferrer">{problem.name}</a>
                <div className={classes.extraInfo}>
                    <Table striped bordered hover size="sm">
                        <tbody>
                        <tr>
                            <td>Source</td>
                            <td>{problem.source}</td>
                        </tr>
                        <tr>
                            <td>Link</td>
                            <td><a href={problem.link}>{problem.link}</a></td>
                        </tr>
                        <tr>
                            <td>Difficulty</td>
                            <td>{problem.difficulty}</td>
                        </tr>
                        <tr>
                            <td>Completed by</td>
                            <td>{problem?.numOfSubmissions} members</td>
                        </tr>
                        <tr>
                            <td>Date Added</td>
                            <td>{new Date(problem.dateCreated).toLocaleDateString()}</td>
                        </tr>
                        </tbody>
                    </Table>
                </div>
            </Col>
        </Row>
    );
};

export default ProblemInfoSection;