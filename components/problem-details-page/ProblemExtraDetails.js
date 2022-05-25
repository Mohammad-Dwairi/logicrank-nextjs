
import classes from './styles.module.scss';
import SyntaxHighlighter from 'react-syntax-highlighter';
// import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const ProblemExtraDetails = props => {

    const {code, comment} = props;

    return (
        <div className={classes.extraInfoModal}>
            <>
                <p>Submitted Solution Code</p>
                <SyntaxHighlighter language="javascript" className={classes.codeView}>
                    {code}
                </SyntaxHighlighter>
            </>
            <>
                <p>Submission Comment</p>
                <SyntaxHighlighter className={classes.commentView}>
                    {comment}
                </SyntaxHighlighter>
            </>

        </div>
    );
};

export default ProblemExtraDetails;