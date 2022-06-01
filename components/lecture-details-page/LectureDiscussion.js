import classes from './styles.module.scss';


const LectureDiscussion = ({comments}) => {


    return (
        <div className={classes.discussionSection}>
            <h1>Lecture Discussion</h1>
            <div className={classes.commentsSection}>
                <div className={classes.commentsList}>

                </div>
                <div className={classes.newCommentContainer}>

                </div>
            </div>
        </div>
    );
};

export default LectureDiscussion;