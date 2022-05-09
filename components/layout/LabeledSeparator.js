import classes from "./styles.module.scss";


const LabeledSeparator = ({label}) => {

    return (
        <div className={classes.labeledSeparatorContainer}>
            <span className={classes.label}>{label}</span>
            <span className={classes.separator}></span>
        </div>
    );
};

export default LabeledSeparator;