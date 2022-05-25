import PopoverContainer from "../shared/popover/PopoverContainer";
import classes from "../shared/popover/styles.module.scss";
import ProblemStatus from "./ProblemStatus";
import AppButton from "../shared/AppButton";

const PopoverContent = props => {

    const {isCompleted, problemId, onDeleteProblem, onAddSolvedProblem, onRemoveSolvedProblem} = props;

    return (
        <div className={`${classes.popoverContentContainer} d-flex justify-content-center flex-column`}>
            <AppButton
                onClick={isCompleted ? () => onRemoveSolvedProblem(problemId) : onAddSolvedProblem}
                title={isCompleted ? 'Mark as uncompleted' : 'Mark as completed'}
                outlined
                danger={isCompleted}
            />
            <AppButton
                onClick={() => onDeleteProblem(problemId)}
                title={'Delete Problem'}
                outlined
                danger
            />
        </div>
    );
};

const ToggleProblemCompletePopover = props => {

    const {isCompleted, onAddSolvedProblem, onRemoveSolvedProblem, problemId, onDeleteProblem} = props;

    return (
        <PopoverContainer
            content={
                <PopoverContent
                    problemId={problemId}
                    isCompleted={isCompleted}
                    onAddSolvedProblem={onAddSolvedProblem}
                    onRemoveSolvedProblem={onRemoveSolvedProblem}
                    onDeleteProblem={onDeleteProblem}
                />
            }
            positions={['bottom']}
        >
            <div>
                <ProblemStatus isCompleted={isCompleted}/>
            </div>
        </PopoverContainer>
    );
};

export default ToggleProblemCompletePopover;