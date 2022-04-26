
import classes from './styles.module.scss';

const FormGroupWrapper = props => {
    console.log("rerendered")
    return (
        <div className={classes.formGroup}>
            {props.children}
        </div>
    );
};

export default FormGroupWrapper;