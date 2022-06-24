
import classes from './styles.module.scss';
import SyntaxHighlighter from 'react-syntax-highlighter';
import NewPostInput from "../shared/NewPostInput";
import {addDoc, collection, doc, updateDoc} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {SUBMISSIONS} from "../../firebase/constants/COLLECTIONS";
import {useRouter} from "next/router";
import {useState} from "react";


const ProblemExtraDetails = props => {

    const {submission, sId, isAdmin} = props;
    const [feedback, setFeedback] = useState(submission.feedback);

    const onAddFeedback = async (value, attachmentFile) => {
        setFeedback(value);
        await updateDoc(doc(db, SUBMISSIONS, sId), {feedback: value});
    };

    return (
        <div className={classes.extraInfoModal}>
            <>
                <p>Submitted Solution Code</p>
                <SyntaxHighlighter language="javascript" className={classes.codeView}>
                    {submission.codeSnippet}
                </SyntaxHighlighter>
            </>
            <>
                <p>Submission Comment</p>
                <SyntaxHighlighter className={classes.commentView}>
                    {submission.comment}
                </SyntaxHighlighter>
            </>
            <>
                <p>Submission Feedback</p>
                <SyntaxHighlighter className={classes.commentView}>
                    {feedback || 'No feedback yet'}
                </SyntaxHighlighter>
            </>
            <>
                {isAdmin && <NewPostInput
                    placeholder='Add a feedback'
                    hideImage={true}
                    disableAttachment={true}
                    onSubmit={onAddFeedback}
                />}
            </>

        </div>
    );
};

export default ProblemExtraDetails;