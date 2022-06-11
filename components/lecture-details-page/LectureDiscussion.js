import PostCard from '../shared/PostCard';
import classes from './styles.module.scss';
import {useEffect} from "react";
import NewPostInput from "../shared/NewPostInput";
import {fbUploadBlobToStorage} from "../../firebase/functions/firebase-storage-functions";
import {useAuth} from "../../context/AuthContext";
import {useRouter} from "next/router";
import {arrayUnion, doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {ROOM_LECTURES, ROOMS_DETAILS_COLLECTION} from "../../firebase/constants/COLLECTIONS";
import Image from "next/image";


const renderComments = comments => comments.map((comment, index) => (
    <PostCard
        key={index}
        post={comment}
        onEdit={() => null} onDelete={() => null}
    />
));

const LectureDiscussion = ({comments, onCommentSubmit}) => {

    const {currentUser, userInfo} = useAuth();
    const {rid, lectureId} = useRouter().query;

    useEffect(() => {
        const commentsList = document.getElementById('commentsList');
        commentsList.scrollTop = commentsList.scrollHeight;
    }, [comments]);

    const commentSubmitHandler = async (text, file) => {
        if (!text && !file) return;
        const commentContent = {
            text,
            datePosted: +new Date(),
            userUID: currentUser.uid,
            userName: userInfo.fullName
        };

        if (file) {
            commentContent['attachment'] = {
                link: await fbUploadBlobToStorage(`${rid}/lectures/${lectureId}`, file),
                type: file.type,
                size: file.size,
                name: file.name
            };
        }
        await updateDoc(doc(db, ROOMS_DETAILS_COLLECTION, rid, ROOM_LECTURES, lectureId), {comments: arrayUnion(commentContent)});
        onCommentSubmit();

    };

    return (
        <div className={classes.discussionSection}>
            <div className={classes.commentsList} id='commentsList'>
                {
                    comments && comments.length !== 0 ? renderComments(comments || []) :
                        <div>
                            <Image src={require('../../public/think.svg')} width={400} height={400}/>
                            <p className='text-center fw-bold'>No Comments on this lecture yet</p>
                        </div>
                }
            </div>
            <div className={classes.newCommentContainer}>
                <NewPostInput onSubmit={commentSubmitHandler}/>
            </div>
        </div>
    );
};

export default LectureDiscussion;