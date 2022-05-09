import classes from './styles.module.scss';
import LabeledSeparator from "../layout/LabeledSeparator";


const renderItems = items => items?.map((item, index) => (
    <h1 key={index} className={classes.itemText}>
        {item}
    </h1>
));

const AdditionalInfoSection = props => {

    const {label, items} = props;

    return (
        <div className={classes.additionalInfoSection}>
          <LabeledSeparator label={label}/>
            <div className={classes.itemsContainer}>
                {renderItems(items)}
            </div>
        </div>
    );
};

export default AdditionalInfoSection;