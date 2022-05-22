
import classes from './styles.module.scss';

const AppButton = props => {

    const {title, onClick} = props;

    return <button className={classes.appButton} onClick={onClick}>{title}</button>
};

export default AppButton;
