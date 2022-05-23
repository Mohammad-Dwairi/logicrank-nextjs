import {useState} from "react";
import FileUpload from "../shared/FileUpload";
import FileType from "../shared/FileType";
import AppButton from "../shared/AppButton";

const MaterialsUploadInput = ({onFileUpload}) => {

    const [file, setFile] = useState(null);

    const fileHandler = (e) => {
        const f = e.target.files[0];
        if (f.size / 1024 / 1024 > 300) {
            e.target.value = '';
            return alert('File too large');
        }
        setFile(f);
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
                <AppButton onClick={() => onFileUpload(file)} title='Upload'/>
                <AppButton onClick={() => setFile(null)} title='Remove' outlined danger/>
            </div>
        </div>
    );

};

export default MaterialsUploadInput;