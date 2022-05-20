import {useState} from "react";
import classes from './styles.module.scss';
import FileUpload from "../shared/FileUpload";
import FileType from "../shared/FileType";
import {uploadBlobToStorage} from "../../store/actions/firebase-storage-actions";
import {useRouter} from "next/router";
import {useUser} from "../../store/UserContext";

const MaterialsUploadInput = props => {

    const [file, setFile] = useState(null);
    const router = useRouter();
    const {userInfo} = useUser();
    const {rid} = router.query;

    const fileHandler = (e) => {
        const f = e.target.files[0];
        if (f.size / 1024 / 1024 > 300) {
            e.target.value = '';
            return alert('File too large');
        }
        setFile(f);
    };

    const fileUploadHandler = async () => {
        const url = await uploadBlobToStorage(`${rid}/materials`, file, userInfo.fullName);
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