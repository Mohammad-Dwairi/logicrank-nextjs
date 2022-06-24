import {withProtected} from "../../../hoc/RouteAuth";
import {WithRoomSideBar} from "../../../hoc/WithRoomSideBar";
import {useEffect, useState} from "react";
import {SubmissionTableRows} from "../../../components/problem-details-page/ProblemSubmissions";
import LoadingView from "../../../hoc/LoadingView";
import {collection, query, where} from "firebase/firestore";
import {db} from "../../../firebase/firebase";
import {SUBMISSIONS} from "../../../firebase/constants/COLLECTIONS";
import {useAuth} from "../../../context/AuthContext";
import {fbQueryDocs} from "../../../firebase/functions/firestore-docs-functions";
import {Table} from "react-bootstrap";
import Container from "react-bootstrap/Container";
import {useRouter} from "next/router";


const SubmissionsPage = () => {

    const [submissions, setSubmissions] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const {uid} = useAuth().currentUser;
    const {rid} = useRouter().query;

    useEffect(() => {
        const handle = async () => {
            const q = query(collection(db, SUBMISSIONS), where("userId", '==', uid), where('roomId', '==', rid));
            const submissions = await fbQueryDocs(q);
            if (submissions) {
                setSubmissions(submissions);
            }
            setIsLoading(false)
        };
        handle();
    }, [rid, uid]);

    if (isLoading) return <LoadingView/>;

    return (
        <WithRoomSideBar>
            <Container className='mt-5'>
                <h2 className='mb-3'>Submissions in This Room</h2>
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
                    {Object.keys(submissions).length !== 0 ?
                        <SubmissionTableRows submissions={submissions} isAdmin={false}/> :
                        <tr>
                            <td colSpan={4}>No Submissions</td>
                        </tr>
                    }
                    </tbody>
                </Table>
            </Container>
        </WithRoomSideBar>
    );
};

export default withProtected(SubmissionsPage);