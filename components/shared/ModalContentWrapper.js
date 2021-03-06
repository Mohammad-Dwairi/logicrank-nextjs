
import classes from './styles.module.scss';

const ModalContentWrapper = props => {


    return (
        <div className={classes.modalContentWrapper}>
            {props.children}
        </div>
    );
};

export default ModalContentWrapper;