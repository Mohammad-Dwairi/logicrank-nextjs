import Row from "react-bootstrap/Row";
import classes from './styles.module.scss';
import Col from "react-bootstrap/Col";
import {Table} from "react-bootstrap";
import Link from "next/link";
import AppModal from "../shared/AppModal";
import {useState} from "react";
import ProblemExtraDetails from "./ProblemExtraDetails";

const renderTableRows = submissions => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return submissions.map((s, i) => (
        <tr key={i}>
            <td>{i + 1}</td>
            <td>
                <Link href={`/profile/${s.userId}`}>
                    {s.userName}
                </Link>
            </td>
            <td>{new Date(s.solvedIn).toDateString()}</td>
            <td>
                {
                    s.codeSnippet || s.comment ?
                        <div className={classes.link} onClick={() => setIsModalOpen(true)}>
                            Show Submitted Code</div> :
                        <div>No Code or Comment Submitted</div>
                }
            </td>
            <AppModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                <ProblemExtraDetails code={s.codeSnippet} comment={s.comment}/>
            </AppModal>
        </tr>
    ));
}

const ProblemSubmissions = props => {

    const {submissions} = props;

    return (
        <Row className={classes.infoContainer}>
            <Col sm={12}>
                <span className={classes.title}>Members completed this problem</span>
                <Table striped bordered hover size="sm">
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Solved In</th>
                        <th>Code & Comments</th>
                    </tr>
                    </thead>
                    <tbody>
                    {renderTableRows(submissions)}
                    </tbody>
                </Table>
            </Col>


        </Row>
    );
};

export default ProblemSubmissions;