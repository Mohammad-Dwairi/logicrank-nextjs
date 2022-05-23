import {useState} from "react";
import classes from './styles.module.scss';
import AppButton from "../shared/AppButton";
import FileUpload from "./FileUpload";
import {MdFileUpload} from "react-icons/md";
import {AiFillFolder} from "react-icons/ai";
import FileType from "./FileType";

const FileUploadInput = ({onFileUpload}) => {

    const [file, setFile] = useState(null);

    const fileHandler = (e) => {
        const f = e.target.files[0];
        if (f.size / 1024 / 1024 > 300) {
            e.target.value = '';
            return alert('File too large');
        }
        setFile(f);
    };


    return (
        <div className={classes.modalFileUploadContainer}>
            <div className={classes.modalFileUploadTitleContainer}>
                <AiFillFolder className={classes.modalFileUploadIcon}/>
                <h1 className={classes.modalFileUploadTitle}>Upload New File</h1>
            </div>
            {!file && <div className={classes.modalFileUploadInputContainer}>
                <FileUpload Icon={MdFileUpload} label='Choose File' onChange={fileHandler}/>
            </div>}
            {file && <FileType type={file.type} name={file.name}/>}
            {file && <AppButton title='Upload File' onClick={() => onFileUpload(file)}/>}
        </div>
    );

};

export default FileUploadInput;