import classes from './styles.module.scss';
import {BsNodePlusFill} from "react-icons/bs";

const GraphPageHeader = props => {

    const {onClick} = props;

    return (
        <div className={classes.graphPageHeader}>
            <h1>Graph Visualizer</h1>
            <div className={classes.graphControl} onClick={onClick}>
                <BsNodePlusFill size={27}/>
                <div>Add New Node</div>
            </div>
        </div>
    );
};

export default GraphPageHeader;