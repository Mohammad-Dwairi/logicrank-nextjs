import classes from './styles.module.scss';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ToggleProblemCompletePopover from "./ToggleProblemCompletePopover";
import Link from "next/link";
import {useRouter} from "next/router";
import AppModal from "../shared/AppModal";
import {useState} from "react";
import ProblemCompleteForm from "./ProblemCompleteForm";

const ProblemCard = props => {

    const {problem, solvedProblems, onDeleteProblem,problemId, onAddSolvedProblem, onRemoveSolvedProblem} = props;

    const {name, source, difficulty, link} = problem;

    const isCompleted = solvedProblems.indexOf(problemId) !== -1;

    const {rid} = useRouter().query;

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <Row className={classes.problemCard}>
            <Col xl={8} className={classes.problemName}>
                <div>
                    <ToggleProblemCompletePopover
                        problemId={problemId}
                        isCompleted={isCompleted}
                        onAddSolvedProblem={() => setIsModalOpen(true)}
                        onRemoveSolvedProblem={onRemoveSolvedProblem}
                        onDeleteProblem={onDeleteProblem}
                    />
                </div>
                <a href={link} target='_blank' rel="noreferrer">{name}</a>
            </Col>
            <Col className={classes.problemInfo}>
                <span className='text-capitalize'>{difficulty}</span>
                <span className='text-capitalize'>{source}</span>
                <Link href={`/room/${rid}/problems/${problemId}`} passHref>
                    <a className='text-capitalize'>show details</a>
                </Link>
                <AppModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                    <ProblemCompleteForm
                        problemId={problemId}
                        onAddSolvedProblem={onAddSolvedProblem}
                        onSubmitFinish={() => setIsModalOpen(false)}
                    />
                </AppModal>
            </Col>
        </Row>
    );
};
export default ProblemCard;