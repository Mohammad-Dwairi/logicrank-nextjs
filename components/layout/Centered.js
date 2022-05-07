import classes from './styles.module.scss';

const Centered = ({children}) => {

    return (
        <div className={classes.centered}>
            {children}
        </div>
    );
};

export default Centered;