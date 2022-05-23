import classes from './styles.module.scss';

const AppButton = props => {

    const {title, onClick, outlined, danger} = props;

    const getStyles = () => {
        if (outlined && danger) return {backgroundColor: 'transparent', color: 'crimson'};
        if (danger) return {backgroundColor: 'crimson'};
        if (outlined) return {backgroundColor: 'transparent', color: '#4267B2'};
        if (!outlined && !danger) return {};
    }

    return (
        <button
            className={classes.appButton}
            style={getStyles()}
            onClick={onClick}
        >
            {title}
        </button>
    );
};

export default AppButton;
