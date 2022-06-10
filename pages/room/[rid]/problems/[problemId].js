import {withProtected} from "../../../../hoc/RouteAuth";
import Container from "react-bootstrap/Container";
import ProblemInfoSection from "../../../../components/problem-details-page/ProblemInfoSection";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import LoadingView from "../../../../hoc/LoadingView";
import {fbQueryDocs, fbQuerySingleDoc} from "../../../../firebase/functions/firestore-docs-functions";
import {PROBLEMS_COLLECTION, ROOMS_DETAILS_COLLECTION, SUBMISSIONS} from "../../../../firebase/constants/COLLECTIONS";
import {collection, query, where} from "firebase/firestore";
import {db} from "../../../../firebase/firebase";
import ProblemSubmissions from "../../../../components/problem-details-page/ProblemSubmissions";
import {useAuth} from "../../../../context/AuthContext";


const ProblemDetailsPage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const [problem, setProblem] = useState(null);
    const [submissions, setSubmissions] = useState([]);

    const {uid} = useAuth().currentUser;

    const router = useRouter();
    const {problemId, rid} = router.query;

    useEffect(() => {
        const handle = async () => {
            const problemRef = collection(db, ROOMS_DETAILS_COLLECTION, rid, PROBLEMS_COLLECTION);
            const problemQuery = query(problemRef, where("__name__", '==', problemId));
            const fetchedProblem = await fbQuerySingleDoc(problemQuery);

            if (!fetchedProblem) {
                return await router.replace(`/room/${rid}/problems`);
            }

            const q = query(collection(db, SUBMISSIONS), where("userId", '==', uid), where("problemId", '==', problemId));
            const fetchedSubmissions = await fbQueryDocs(q);

            if (fetchedSubmissions) {
                setSubmissions(Object.values(fetchedSubmissions));
            }

            setProblem(fetchedProblem || null);
            setIsLoading(false);
        };
        handle();
    }, [problemId, rid]);

    console.log(submissions)

    if (isLoading) return <LoadingView/>;

    return (
        <Container>
            <ProblemInfoSection problem={problem}/>
            <ProblemSubmissions submissions={submissions}/>
        </Container>
    );
};

export default withProtected(ProblemDetailsPage);