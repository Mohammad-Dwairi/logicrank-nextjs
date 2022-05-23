import classes from './styles.module.scss';
import {BiUpload} from "react-icons/bi";

const FileUpload = props => {

    const {onChange, label, Icon} = props;

    return (
        <div className='d-flex'>
            <label className={classes.fileUpload}>
                <input type="file" onChange={onChange}/>
                {Icon && <Icon className={classes.icon}/>}
                {label && <span className={classes.fileUploadLabel}>{label}</span>}
            </label>

        </div>
    );
};

export default FileUpload;