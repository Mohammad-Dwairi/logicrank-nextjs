import classes from './styles.module.scss';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ToggleProblemCompletePopover from "./ToggleProblemCompletePopover";

const ProblemCard = props => {

    const {problem, solvedProblems, onDeleteProblem,problemId, onAddSolvedProblem, onRemoveSolvedProblem} = props;

    const {name, source, difficulty, link} = problem;

    const isCompleted = solvedProblems.find(problem => problem.problemId === problemId);

    return (
        <Row className={classes.problemCard}>
            <Col xl={8} className={classes.problemName}>
                <div>
                    <ToggleProblemCompletePopover
                        problemId={problemId}
                        isCompleted={isCompleted}
                        onAddSolvedProblem={onAddSolvedProblem}
                        onRemoveSolvedProblem={onRemoveSolvedProblem}
                        onDeleteProblem={onDeleteProblem}
                    />
                </div>
                <a href={link} target='_blank' rel="noreferrer">{name}</a>
            </Col>
            <Col className={classes.problemInfo}>
                <span className='text-capitalize'>{difficulty}</span>
                <span className='text-capitalize'>{source}</span>
            </Col>
        </Row>
    );
};
export default ProblemCard;