import classes from './styles.module.scss';

const FormGroupWrapper = props => {
    return (
        <div className={classes.formGroup}>
            {props.children}
        </div>
    );
};

export default FormGroupWrapper;