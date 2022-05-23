import classes from './styles.module.scss';
import {useRouter} from "next/router";
import {useForm} from "react-hook-form";
import {BiTrash, BiUpload} from "react-icons/bi";
import {collection} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {useAuth} from "../../context/AuthContext";
import {useState} from "react";
import FileType from "../files-shared/FileType";
import {fbUploadBlobToStorage} from "../../firebase/functions/firebase-storage-functions";
import BlobImageView from "../shared/BlobImageView";
import {useSelector} from "react-redux";
import {fbAddNewDoc} from "../../firebase/functions/firestore-docs-functions";
import {POSTS_COLLECTION, ROOMS_DETAILS_COLLECTION} from "../../firebase/constants/COLLECTIONS";


const NewPostInput = ({onSubmitStart, onSubmitFinish}) => {

    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const [file, setFile] = useState(null);
    const [isImage, setIsImage] = useState(false);
    const router = useRouter();
    const {rid} = router.query;
    const {currentUser} = useAuth();

    const userInfo = useSelector(state => state.userCtx.userInfo);

    const handleFile = (event) => {
        const file = event.target.files[0];

        if ((file.size / 1024 / 1024) >= 40) {
            event.target.file[0] = '';
            return alert('File Too Large');
        }

        setFile(file);

        if (file.type.includes('image')) {
            setIsImage(true);
        }

    };

    const populateMetaData = async data => {
        data['datePosted'] = +new Date();
        data['userUID'] = currentUser.uid;
        data['userName'] = userInfo.fullName;
        if (file) {
            data['attachment'] = {
                link: await fbUploadBlobToStorage(`${rid}/posts`, file),
                type: file.type,
                size: file.size,
                name: file.name
            };
        }
    };

    const handlePostSubmit = async data => {
        onSubmitStart();
        await populateMetaData(data);
        const postsCollectionRef = collection(db, ROOMS_DETAILS_COLLECTION, rid, POSTS_COLLECTION);
        await fbAddNewDoc(postsCollectionRef, data);
        setFile(null);
        onSubmitFinish();
    };

    return (
        <form onSubmit={handleSubmit(handlePostSubmit)} className={classes.newPostForm}>
            <textarea
                placeholder="What's on your mind?"
                className={classes.textAreaControl}
                rows={3}
                {...register('text', {required: true})}
            />
            {file && !file.type.includes('image') && <FileType type={file.type} name={file.name}/>}
            {isImage &&
                <div className='d-flex justify-content-center bg-secondary'><BlobImageView imgFile={file}/></div>}
            <div className={classes.postControl}>
                {!file ?
                    <label className={classes.fileUpload}>
                        <input type="file" onChange={handleFile}/>
                        <BiUpload/>
                        <span className={classes.fileUploadLabel}>Upload Attachment</span>
                    </label> :
                    <div className={classes.removeFile}>
                        <BiTrash/>
                        <span onClick={() => {
                            setIsImage(false);
                            setFile(null);
                        }} className={classes.removeFileLabel}>Remove Attachment</span>
                    </div>
                }
                <input type='submit' className={classes.submitBtn} value='Publish Post' disabled={errors.newPost}/>
            </div>
        </form>
    );
};

export default NewPostInput;