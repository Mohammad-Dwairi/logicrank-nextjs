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
import {fbAddNewDoc, fbQueryDocByUID, fbQueryDocs} from "../../../../firebase/functions/firestore-docs-functions";
import {
    PROBLEMS_COLLECTION, ROOMS_COLLECTION,
    ROOMS_DETAILS_COLLECTION,
    SUBMISSIONS,
    USERS_COLLECTION
} from "../../../../firebase/constants/COLLECTIONS";
import {
    addDoc,
    arrayRemove,
    arrayUnion,
    collection,
    deleteDoc,
    doc,
    getDocs,
    increment,
    orderBy,
    query,
    updateDoc,
    where,
} from "firebase/firestore";
import {db} from "../../../../firebase/firebase";
import {useAuth} from "../../../../context/AuthContext";
import {withProtected} from "../../../../hoc/RouteAuth";
import {WithRoomSideBar} from "../../../../hoc/WithRoomSideBar";


const renderProblemCard = (problems, solvedProblems, onDeleteProblem, onAddSolvedProblem, onRemoveSolvedProblem, isOwner) => Object.keys(problems).map(problemID => (
    <ProblemCard
        key={problemID}
        isOwner={isOwner}
        problemId={problemID}
        problem={problems[problemID]}
        solvedProblems={solvedProblems}
        onDeleteProblem={onDeleteProblem}
        onAddSolvedProblem={onAddSolvedProblem}
        onRemoveSolvedProblem={onRemoveSolvedProblem}
    />
));

const ProblemsPage = () => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [problems, setProblems] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const {rid} = useRouter().query;
    const {currentUser, userInfo} = useAuth();

    const [isOwner, setIsOwner] = useState(false);

    const {uid} = useAuth().currentUser;

    useEffect(() => {
        const handle = async () => {
            const problemsColRef = collection(db, ROOMS_DETAILS_COLLECTION, rid, PROBLEMS_COLLECTION);
            const problemsQuery = query(problemsColRef, orderBy("dateCreated", "desc"));
            const fetchedProblems = await fbQueryDocs(problemsQuery);

            const room = await fbQueryDocByUID(ROOMS_COLLECTION, rid);
            if (room) {
                setIsOwner(room.roomInstructorUID === uid);
            }
            setProblems(fetchedProblems);
            setIsLoading(false);
        };

        handle();
    }, [rid, currentUser]);


    const uploadNewProblem = async problem => {
        setIsLoading(true);
        problem.dateCreated = +new Date();
        problem.numOfSubmissions = 0;
        await fbAddNewDoc(collection(db, ROOMS_DETAILS_COLLECTION, rid, PROBLEMS_COLLECTION), problem);
        setProblems({problem, ...problems,});
        setIsModalOpen(false);
        setIsLoading(false);
    };

    const onAddSolvedProblem = async (problemId, extraData) => {

        const newSolvedProblem = {
            userId: currentUser.uid,
            problemId: problemId,
            roomId: rid,
            solvedIn: +new Date(),
            codeSnippet: extraData.code || '',
            comment: extraData.comment || '',
            userName: userInfo.fullName
        };
        await addDoc(collection(db, SUBMISSIONS), newSolvedProblem);
        await updateDoc(doc(db, ROOMS_DETAILS_COLLECTION, rid, PROBLEMS_COLLECTION, problemId), {numOfSubmissions: increment(1)});
        await updateDoc(doc(db, USERS_COLLECTION, uid), {solvedProblems: arrayUnion(problemId)});
    };

    const onRemoveSolvedProblem = async (problemId) => {
        const deleteQuery = query(collection(db, SUBMISSIONS), where('problemId', '==', problemId), where('userId', '==', currentUser.uid));
        const querySnapshot = await getDocs(deleteQuery);
        querySnapshot.forEach(doc => deleteDoc(doc.ref))
        await updateDoc(doc(db, ROOMS_DETAILS_COLLECTION, rid, PROBLEMS_COLLECTION, problemId), {numOfSubmissions: increment(-1)});
        await updateDoc(doc(db, USERS_COLLECTION, uid), {solvedProblems: arrayRemove(problemId)});

    };

    const onDeleteProblem = async problemId => {
        const updatedProblems = {...problems};
        delete updatedProblems[problemId];
        setProblems(updatedProblems)
        const deletedProblemRef = doc(db, ROOMS_DETAILS_COLLECTION, rid, PROBLEMS_COLLECTION, problemId);
        await deleteDoc(deletedProblemRef);
    };

    if (isLoading) return <LoadingView/>;

    return (
        <WithRoomSideBar>
            <Container>
                <Row className={classes.pageHeader}>
                    <Col xl={6}>
                        <h1 className={classes.pageTitle}>Problems Set</h1>
                    </Col>
                    {isOwner && <Col xl={6} className='d-flex justify-content-end p-0'>
                        <AppButton title='Add New Problem' onClick={() => setIsModalOpen(true)}/>
                    </Col>}
                </Row>
                {renderProblemCard(problems, userInfo.solvedProblems || [], onDeleteProblem, onAddSolvedProblem, onRemoveSolvedProblem, isOwner)}
                <AppModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                    <NewProblemForm onSubmit={uploadNewProblem}/>
                </AppModal>
            </Container>
        </WithRoomSideBar>
    );
};

export default withProtected(ProblemsPage);