import Container from "react-bootstrap/Container";
import ProblemCard from "../../../../components/problems-page/ProblemCard";
import classes from '../../../../components/problems-page/styles.module.scss';
import Row from "react-bootstrap/Row";
import AppButton from "../../../../components/shared/AppButton";
import Col from "react-bootstrap/Col";
import AppModal from "../../../../components/shared/AppModal";
import {useEffect, useState} from "react";
import NewProblemForm from "../../../../components/problems-page/NewProblemForm";
import LoadingView from "../../../../hoc/LoadingView";
import {useRouter} from "next/router";
import {fbAddNewDoc, fbQueryDocs} from "../../../../firebase/functions/firestore-docs-functions";
import {
    PROBLEMS_COLLECTION,
    ROOMS_DETAILS_COLLECTION,
    USER_SOLVED_PROBLEMS
} from "../../../../firebase/constants/COLLECTIONS";
import {
    addDoc,
    collection,
    orderBy,
    query,
    where,
    deleteDoc,
    getDocs,
    doc,
    updateDoc,
    increment,
} from "firebase/firestore";
import {db} from "../../../../firebase/firebase";
import {useAuth} from "../../../../context/AuthContext";
import {withProtected} from "../../../../hoc/RouteAuth";
import {useSelector} from "react-redux";


const renderProblemCard = (problems, solvedProblems, onDeleteProblem, onAddSolvedProblem, onRemoveSolvedProblem) => Object.keys(problems).map(problemID => (
    <ProblemCard
        key={problemID}
        problemId={problemID}
        problem={problems[problemID]}
        solvedProblems={solvedProblems}
        onDeleteProblem={onDeleteProblem}
        onAddSolvedProblem={onAddSolvedProblem}
        onRemoveSolvedProblem={onRemoveSolvedProblem}
    />
));

const ProblemsPage = props => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [problems, setProblems] = useState({});
    const [solvedProblems, setSolvedProblems] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const {rid} = useRouter().query;
    const {uid} = useAuth().currentUser;

    const userInfo = useSelector(state => state.userCtx.userInfo);

    useEffect(() => {
        const handle = async () => {
            const problemsColRef = collection(db, ROOMS_DETAILS_COLLECTION, rid, PROBLEMS_COLLECTION);
            const problemsQuery = query(problemsColRef, orderBy("dateCreated", "desc"));
            const fetchedProblems = await fbQueryDocs(problemsQuery);

            const solvedProblemsRef = collection(db, USER_SOLVED_PROBLEMS);
            const solvedProblemsQuery = query(solvedProblemsRef, where('userId', '==', uid));
            const fetchedSolvedProblems = await fbQueryDocs(solvedProblemsQuery);

            setSolvedProblems(Object.values(fetchedSolvedProblems));
            setProblems(fetchedProblems);
            setIsLoading(false);
        };

        handle();
    }, [rid, uid]);


    const uploadNewProblem = async problem => {
        setIsLoading(true);
        problem.dateCreated = +new Date();
        problem.numOfSubmissions = 0;
        await fbAddNewDoc(collection(db, ROOMS_DETAILS_COLLECTION, rid, PROBLEMS_COLLECTION), problem);
        setProblems({problem, ...problems,});
        setIsModalOpen(false);
        setIsLoading(false);
    };

    const onAddSolvedProblem = async (problemId) => {
        if (!solvedProblems.includes(problemId)) {
            const newSolvedProblem = {
                userId: uid,
                problemId: problemId,
                roomId: rid,
                solvedIn: +new Date(),
                codeSnippet: '',
                userName: userInfo.fullName
            };
            const updatedSolvedProblems = [newSolvedProblem, ...solvedProblems];
            setSolvedProblems(updatedSolvedProblems);
            await addDoc(collection(db, USER_SOLVED_PROBLEMS), newSolvedProblem);
            await updateDoc(doc(db, ROOMS_DETAILS_COLLECTION, rid, PROBLEMS_COLLECTION, problemId), {numOfSubmissions: increment(1)})
        }
    };

    const onRemoveSolvedProblem = async (problemId) => {
        const updatedSolvedProblems = solvedProblems.filter(problem => problem.problemId !== problemId);
        setSolvedProblems(updatedSolvedProblems);
        const deleteQuery = query(collection(db, USER_SOLVED_PROBLEMS), where('problemId', '==', problemId), where('userId', '==', uid));
        const querySnapshot = await getDocs(deleteQuery);
        querySnapshot.forEach(doc => deleteDoc(doc.ref))
        await updateDoc(doc(db, ROOMS_DETAILS_COLLECTION, rid, PROBLEMS_COLLECTION, problemId), {numOfSubmissions: increment(-1)})

    };

    const onDeleteProblem = async problemId => {
        const updatedProblems = {...problems};
        delete updatedProblems[problemId];
        setProblems(updatedProblems)
        const deletedProblemRef = doc(db, ROOMS_DETAILS_COLLECTION, rid, PROBLEMS_COLLECTION, problemId);
        await deleteDoc(deletedProblemRef);
    };

    return (
        <LoadingView isLoading={isLoading}>
            <Container>
                <Row className={classes.pageHeader}>
                    <Col xl={6}>
                        <h1 className={classes.pageTitle}>Suggested Problems</h1>
                    </Col>
                    <Col xl={6} className='d-flex justify-content-end p-0'>
                        <AppButton title='Add New Problem' onClick={() => setIsModalOpen(true)}/>
                    </Col>
                </Row>
                {renderProblemCard(problems, solvedProblems, onDeleteProblem, onAddSolvedProblem, onRemoveSolvedProblem)}
                <AppModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                    <NewProblemForm onSubmit={uploadNewProblem}/>
                </AppModal>
            </Container>
        </LoadingView>

    );
};

export default withProtected(ProblemsPage);