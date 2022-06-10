import classes from './styles.module.scss';
import {useLayoutEffect, useRef, useState} from "react";
import AttachmentView from "./AttachmentView";
import {AiOutlineSend} from "react-icons/ai";
import UserProfileBadge from "./UserProfileBadge";
import LoadingSpinner from "../layout/LoadingSpinner";

const MIN_TEXTAREA_HEIGHT = 32;

const NewPostInput = props => {

    const {onSubmit} = props;

    const [attachmentFile, setAttachmentFile] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const textareaRef = useRef(null);
    const [value, setValue] = useState("");
    const onChange = (event) => setValue(event.target.value);

    useLayoutEffect(() => {
        // Reset height - important to shrink on delete
        textareaRef.current.style.height = "inherit";
        // Set height
        textareaRef.current.style.height = `${Math.max(
            textareaRef.current.scrollHeight,
            MIN_TEXTAREA_HEIGHT
        )}px`;
    }, [value]);

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
                    placeholder="What&apos;s in your mind?"
                    style={{minHeight: MIN_TEXTAREA_HEIGHT, resize: "none"}}
                    rows={1}
                    onChange={onChange}
                    ref={textareaRef}
                    value={value}
                    className='noScrollBar'
                />
                <div className={classes.postAttachments}>
                    <AttachmentView file={attachmentFile} onChange={attachmentFileHandler} onDelete={onDeleteFile}/>
                </div>
            </div>
            <AiOutlineSend className={classes.sendBtn} onClick={async () => {
                setIsLoading(true);
                await onSubmit(value, attachmentFile);
                setAttachmentFile(null);
                setIsLoading(false);
            }}/>
        </div>
    );
};

export default NewPostInput;