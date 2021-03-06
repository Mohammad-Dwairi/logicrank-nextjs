import FileUpload from "../files-shared/FileUpload";
import {MdAttachment} from "react-icons/md";
import FileType from "../files-shared/FileType";
import AppButton from "./AppButton";


const AttachmentView = props => {
    const {file, onChange, onDelete, displayName} = props;

    if (!file) {
        return <FileUpload label='Upload Attachment' Icon={MdAttachment} onChange={onChange}/>;
    }

    return (
        <div className='text-center'>
            <FileType type={file.type} name={file.name} file={file} iconSize={40} displayName={displayName} onFileRemove={onDelete}/>
            {!file.type.includes('image') && <AppButton title='delete' onClick={onDelete} outlined danger/>}
        </div>
    );
};

export default AttachmentView;