import {MdCheckCircle, MdOutlinePending} from "react-icons/md";
import classes from './styles.module.scss';

const ProblemStatus = ({isCompleted}) => {
    return isCompleted ? <MdCheckCircle className={classes.problemCompletedIcon}/> : <MdOutlinePending className={classes.problemPendingIcon}/>
};

export default ProblemStatus;