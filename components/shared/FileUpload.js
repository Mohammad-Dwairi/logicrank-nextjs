import classes from './styles.module.scss';
import {BiUpload} from "react-icons/bi";

const FileUpload = props => {

    const {onChange} = props;

    return (
        <div className='d-flex'>
            <label className={classes.fileUpload}>
                <input type="file" onChange={onChange}/>
                <BiUpload className={classes.icon}/>
                <span className={classes.fileUploadLabel}>Upload File</span>
            </label>

        </div>
    );
};

export default FileUpload;