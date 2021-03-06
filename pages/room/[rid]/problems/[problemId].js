import {withProtected} from "../../../../hoc/RouteAuth";
import Container from "react-bootstrap/Container";
import ProblemInfoSection from "../../../../components/problem-details-page/ProblemInfoSection";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import LoadingView from "../../../../hoc/LoadingView";
import {fbQueryDocByUID, fbQueryDocs, fbQuerySingleDoc} from "../../../../firebase/functions/firestore-docs-functions";
import {
    PROBLEMS_COLLECTION,
    ROOMS_COLLECTION,
    ROOMS_DETAILS_COLLECTION,
    SUBMISSIONS
} from "../../../../firebase/constants/COLLECTIONS";
import {collection, query, where} from "firebase/firestore";
import {db} from "../../../../firebase/firebase";
import ProblemSubmissions from "../../../../components/problem-details-page/ProblemSubmissions";
import {useAuth} from "../../../../context/AuthContext";
import {WithRoomSideBar} from "../../../../hoc/WithRoomSideBar";


const ProblemDetailsPage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [problem, setProblem] = useState(null);
    const [submissions, setSubmissions] = useState({});

    const {uid} = useAuth().currentUser;

    const router = useRouter();
    const {problemId, rid} = router.query;

    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        const handle = async () => {
            const problemRef = collection(db, ROOMS_DETAILS_COLLECTION, rid, PROBLEMS_COLLECTION);
            const problemQuery = query(problemRef, where("__name__", '==', problemId));
            const fetchedProblem = await fbQuerySingleDoc(problemQuery);

            if (!fetchedProblem) {
                return await router.replace(`/room/${rid}/problems`);
            }

            const q = query(collection(db, SUBMISSIONS), where("problemId", '==', problemId));
            const fetchedSubmissions = await fbQueryDocs(q);
            const room = await fbQueryDocByUID(ROOMS_COLLECTION, rid);
            if (room) {
                setIsAdmin(room.roomInstructorUID === uid);
            }
            if (fetchedSubmissions) {
                setSubmissions(fetchedSubmissions);
            }

            setProblem(fetchedProblem || null);
            setIsLoading(false);
        };
        handle();
    }, [problemId, rid]);

    console.log(submissions)

    if (isLoading) return <LoadingView/>;

    return (
        <WithRoomSideBar>
            <Container>
                <ProblemInfoSection problem={problem}/>
                <ProblemSubmissions submissions={submissions} isAdmin={isAdmin}/>
            </Container>
        </WithRoomSideBar>
    );
};

export default withProtected(ProblemDetailsPage);