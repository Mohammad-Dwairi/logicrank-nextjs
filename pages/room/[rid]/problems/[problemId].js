import {withProtected} from "../../../../hoc/RouteAuth";
import Container from "react-bootstrap/Container";
import ProblemInfoSection from "../../../../components/problem-details-page/ProblemInfoSection";
import {useRouter} from "next/router";
import {useEffect, useState} from "react";
import LoadingView from "../../../../hoc/LoadingView";
import {fbQueryDocs, fbQuerySingleDoc} from "../../../../firebase/functions/firestore-docs-functions";
import {
    PROBLEMS_COLLECTION,
    ROOMS_DETAILS_COLLECTION,
    USER_SOLVED_PROBLEMS
} from "../../../../firebase/constants/COLLECTIONS";
import {collection, query, where} from "firebase/firestore";
import {db} from "../../../../firebase/firebase";
import ProblemSubmissions from "../../../../components/problem-details-page/ProblemSubmissions";


const ProblemDetailsPage = () => {

    const {problemId, rid} = useRouter().query;
    const [isLoading, setIsLoading] = useState(true);
    const [problem, setProblem] = useState(null);
    const [submissions, setSubmissions] = useState([]);

    useEffect(() => {
        const handle = async () => {
            const problemRef = collection(db, ROOMS_DETAILS_COLLECTION, rid, PROBLEMS_COLLECTION);
            const problemQuery = query(problemRef, where("__name__", '==', problemId));
            const fetchedProblem = await fbQuerySingleDoc(problemQuery);

            const submissionsRef = collection(db, USER_SOLVED_PROBLEMS);
            const submissionsQuery = query(submissionsRef, where('problemId', '==', problemId));
            const fetchedSubmissions = await fbQueryDocs(submissionsQuery);

            setProblem(fetchedProblem);
            setSubmissions(Object.values(fetchedSubmissions));
            setIsLoading(false);
        };
        handle();
    }, [problemId, rid]);

    console.log('SUBS ', submissions);
    return (
        <LoadingView isLoading={isLoading}>
            <Container>
                <ProblemInfoSection problem={problem}/>
                <ProblemSubmissions submissions={submissions}/>
            </Container>
        </LoadingView>
    );
};

export default withProtected(ProblemDetailsPage);