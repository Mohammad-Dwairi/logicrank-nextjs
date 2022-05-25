import Row from "react-bootstrap/Row";
import classes from './styles.module.scss';
import Col from "react-bootstrap/Col";
import {Table} from "react-bootstrap";
import AppButton from "../shared/AppButton";
import Link from "next/link";
import {useEffect, useState} from "react";
import {collection, orderBy, query, where} from "firebase/firestore";
import {USERS_COLLECTION} from "../../firebase/constants/COLLECTIONS";
import {fbQueryDocs} from "../../firebase/functions/firestore-docs-functions";
import {db} from "../../firebase/firebase";

const renderTableRows = submissions => submissions.map((s, i) => (
    <tr key={i}>
        <td>{i + 1}</td>
        <td>
            <Link href={`/profile/${s.userId}`}>
                {s.userName}
            </Link>
        </td>
        <td>{new Date(s.solvedIn).toDateString()}</td>
        <td>
            <div>Show Submitted Code</div>
        </td>
    </tr>
));

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
                        <th>Code</th>
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