import classes from './styles.module.scss';
import {useRef, useState} from "react";
import AttachmentView from "./AttachmentView";
import {AiOutlineSend} from "react-icons/ai";
import UserProfileBadge from "./UserProfileBadge";
import LoadingSpinner from "../layout/LoadingSpinner";


const NewPostInput = props => {

    const {onSubmit} = props;

    const textRef = useRef(null);
    const [textareaRows, setTextareaRows] = useState(1);
    const [attachmentFile, setAttachmentFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const attachmentFileHandler = (event) => {
        const file = event.target.files[0];
        if ((file.size / 1024 / 1024) >= 40) {
            event.target.file[0] = '';
            return alert('File Too Large');
        }
        setAttachmentFile(file);
    };

    const onDeleteFile = () => {
        setAttachmentFile(null);
    }

    const textChangeHandler = e => {
        const text = e.target.value;
        const numOfRows = text.length / 85 + 1;
        setTextareaRows(numOfRows);
    };

    if (isLoading) {
        return (
            <div className={classes.newPostInputContainer} style={{padding: '1rem'}}>
                <LoadingSpinner/>
            </div>
        );
    }

    return (
        <div className={classes.newPostInputContainer}>
            <UserProfileBadge/>
            <div className={classes.postControlContainer}>
                <textarea
                    placeholder="What&apos;s in your mind, Mohammad?"
                    rows={textareaRows}
                    onChange={textChangeHandler}
                    ref={textRef}
                />
                <div className={classes.postAttachments}>
                    <AttachmentView file={attachmentFile} onChange={attachmentFileHandler} onDelete={onDeleteFile}/>
                </div>
            </div>
            <AiOutlineSend className={classes.sendBtn} onClick={async () => {
                setIsLoading(true);
                await onSubmit(textRef.current.value, attachmentFile);
                setAttachmentFile(null);
                setIsLoading(false);
            }}/>
        </div>
    );
};

export default NewPostInput;