import Row from "react-bootstrap/Row";
import classes from './styles.module.scss';
import Col from "react-bootstrap/Col";
import {Table} from "react-bootstrap";
import Link from "next/link";
import AppModal from "../shared/AppModal";
import {useState} from "react";
import ProblemExtraDetails from "./ProblemExtraDetails";

const renderTableRows = (submissions, isAdmin) => {

    const [isModalOpen, setIsModalOpen] = useState(false);

    return Object.keys(submissions).map((sId, i) => (
        <tr key={i}>
            <td>{i + 1}</td>
            <td>
                <Link href={`/profile/${submissions[sId].userId}`}>
                    {submissions[sId].userName}
                </Link>
            </td>
            <td>{new Date(submissions[sId].solvedIn).toDateString()}</td>
            <td>
                {
                    submissions[sId].codeSnippet || submissions[sId].comment ?
                        <div className={classes.link} onClick={() => setIsModalOpen(true)}>
                            Show Submitted Code</div> :
                        <div>No Code or Comment Submitted</div>
                }
            </td>
            <AppModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                <ProblemExtraDetails submission={submissions[sId]} sId={sId} isAdmin={isAdmin}/>
            </AppModal>
        </tr>
    ));
}

const ProblemSubmissions = props => {

    const {submissions,isAdmin} = props;

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
                    {renderTableRows(submissions, isAdmin)}
                    </tbody>
                </Table>
            </Col>


        </Row>
    );
};

export default ProblemSubmissions;