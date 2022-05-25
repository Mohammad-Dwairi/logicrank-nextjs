import classes from './styles.module.scss';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useForm} from "react-hook-form";

const NewLectureForm = props => {

    const {onSubmit} = props;
    const {register, handleSubmit, watch, formState: {errors}} = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container className={classes.newLectureForm}>
                <Row className={classes.inputRow}>
                    <Col lg={3}>
                        <label htmlFor='title'>Lecture Title</label>
                    </Col>
                    <Col lg={9}>
                        <input type='text' id='title' {...register('title', {required: true})}/>
                    </Col>
                </Row>
                <Row className={classes.inputRow}>
                    <Col lg={3}>
                        <label htmlFor='link'>Lecture Link</label>
                    </Col>
                    <Col lg={9}>
                        <input type='text' id='link' {...register('link', {required: true})}/>
                    </Col>
                </Row>
                <Row className={classes.inputRow}>
                    <Col lg={3}>
                        <label htmlFor='dateCreated'>Date</label>
                    </Col>
                    <Col lg={9}>
                        <input type='date' id='dateCreated' {...register('dateCreated', {required: true})}/>
                    </Col>
                </Row>
                <Row className={classes.inputRow}>
                    <Col lg={6}>
                        <label htmlFor='startTime'>Starts At</label>
                        <input type='time' id='startTime' {...register('startTime', {required: true})}/>
                    </Col>
                    <Col lg={6}>
                        <label htmlFor='endTime'>Ends At</label>
                        <input type='time' id='endTime' {...register('endTime', {required: true})}/>
                    </Col>
                </Row>

                <input type='submit' value='Add Lecture' />
            </Container>
        </form>
    );
};

export default NewLectureForm;