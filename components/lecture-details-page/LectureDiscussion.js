import PostCard from '../shared/PostCard';
import classes from './styles.module.scss';
import {useEffect} from "react";
import NewPostInput from "../shared/NewPostInput";
import {fbUploadBlobToStorage} from "../../firebase/functions/firebase-storage-functions";
import {useAuth} from "../../context/AuthContext";
import {useSelector} from "react-redux";
import {useRouter} from "next/router";
import {arrayUnion, doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {ROOM_LECTURES, ROOMS_DETAILS_COLLECTION} from "../../firebase/constants/COLLECTIONS";


const renderComments = comments => comments.map((comment, index) => (
    <PostCard
        key={index}
        post={comment}
        onEdit={() => null} onDelete={() => null}
    />
));

const LectureDiscussion = ({comments, updateCommentsHandler}) => {

    const {uid} = useAuth().currentUser;
    const {rid, lectureId} = useRouter().query;

    const userInfo = useSelector(state => state.userCtx.userInfo);

    useEffect(() => {
        const commentsList = document.getElementById('commentsList');
        commentsList.scrollTop = commentsList.scrollHeight;
    }, [comments]);

    const onCommentSubmit = async (text, file) => {
        if (!text && !file) return;

        const commentContent = {
            text,
            datePosted: +new Date(),
            userUID: uid,
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
        updateCommentsHandler([...comments, commentContent]);
        await updateDoc(doc(db, ROOMS_DETAILS_COLLECTION, rid, ROOM_LECTURES, lectureId), {comments: arrayUnion(commentContent)});
    };


    return (
        <div className={classes.discussionSection}>
            <div className={classes.commentsList} id='commentsList'>
                {renderComments(comments)}
            </div>
            <div className={classes.newCommentContainer}>
                <NewPostInput onSubmit={onCommentSubmit}/>
            </div>
        </div>
    );
};

export default LectureDiscussion;