import classes from './styles.module.scss';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useForm} from "react-hook-form";

const ProblemCompleteForm = props => {

    const {onAddSolvedProblem, onSubmitFinish, problemId} = props;
    const {register, handleSubmit, watch, formState: {errors}} = useForm();

    const onSubmit = async data => {
        onAddSolvedProblem(problemId, data);
        onSubmitFinish();
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container className={classes.newProblemForm}>
                <Row>
                    <h1 className={classes.newProblemTitle}>Submit Your Solution</h1>
                </Row>
                <Row className={classes.inputRow}>
                    <Col lg={3}>
                        <label htmlFor='code'>Submit Your Solution Code
                            <span className='text-muted mx-2 fw-light'>(optional)</span>
                        </label>
                    </Col>
                    <Col lg={9}>
                        <textarea rows={8} id='code' {...register('code')}/>
                    </Col>
                </Row>
                <Row className={classes.inputRow}>
                    <Col lg={3}>
                        <label htmlFor='comment'>Leave a comment
                            <span className='text-muted mx-2 fw-light'>(optional)</span>
                        </label>
                    </Col>
                    <Col lg={9}>
                        <textarea rows={2} id='comment' {...register('comment')}/>
                    </Col>
                </Row>
                <input type='submit' value='Submit'/>
            </Container>
        </form>
    );
};

export default ProblemCompleteForm;