import classes from '../shared/styles.module.scss';

const FileUpload = props => {

    const {onChange, label, Icon, iconSize} = props;

    return (
        <div className='d-flex'>
            <label className={classes.fileUpload}>
                <input type="file" onChange={onChange}/>
                {Icon && <Icon className={classes.icon} size={iconSize}/>}
                {label && <span className={classes.fileUploadLabel}>{label}</span>}
            </label>
        </div>
    );
};

export default FileUpload;