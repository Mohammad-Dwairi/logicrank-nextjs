import {useState} from "react";
import classes from './styles.module.scss';
import FileUpload from "../shared/FileUpload";
import FileType from "../shared/FileType";
import {fbUploadBlobToStorage} from "../../firebase/functions/firebase-storage-functions";
import {useRouter} from "next/router";
import {useSelector} from "react-redux";

const MaterialsUploadInput = () => {

    const [file, setFile] = useState(null);
    const userInfo = useSelector(state => state.userCtx.userInfo);
    const {rid} = useRouter().query;

    const fileHandler = (e) => {
        const f = e.target.files[0];
        if (f.size / 1024 / 1024 > 300) {
            e.target.value = '';
            return alert('File too large');
        }
        setFile(f);
    };

    const fileUploadHandler = async () => {
        await fbUploadBlobToStorage(`${rid}/materials`, file, userInfo.fullName);
    };

    if (!file) {
        return (
            <FileUpload onChange={fileHandler}/>
        );
    }

    return (
        <div className='d-flex align-items-center justify-content-between'>
            <FileType type={file.type} name={file.name}/>
            <div>
                <button className={classes.uploadButton} onClick={fileUploadHandler}>Upload</button>
                <button className={classes.removeButton} onClick={() => setFile(null)}>Remove</button>
            </div>
        </div>
    );

};

export default MaterialsUploadInput;