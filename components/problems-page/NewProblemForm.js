import classes from './styles.module.scss';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useForm} from "react-hook-form";

const NewProblemForm = ({onSubmit}) => {

    const {register, handleSubmit, watch, formState: {errors}} = useForm();

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Container className={classes.newProblemForm}>
                <Row>
                    <h1 className={classes.newProblemTitle}>Add New Problem</h1>
                </Row>
                <Row className={classes.inputRow}>
                    <Col lg={3}>
                        <label htmlFor='name'>Problem Name</label>
                    </Col>
                    <Col lg={9}>
                        <input type='text' id='name' {...register('name', {required: true})}/>
                        {errors.name && <span className='text-danger'>Problem name is required</span>}
                    </Col>
                </Row>
                <Row className={classes.inputRow}>
                    <Col lg={3}>
                        <label htmlFor='link'>Problem Link</label>
                    </Col>
                    <Col lg={9}>
                        <input type='text' id='link' {...register('link', {required: true})}/>
                        {errors.link && <span className='text-danger'>Problem link is required</span>}
                    </Col>
                </Row>
                <Row className={classes.inputRow}>
                    <Col lg={3}>
                        <label htmlFor='website'>Problem Website</label>
                    </Col>
                    <Col lg={9}>
                        <input type='text' id='website' {...register('source', {required: true})}/>
                        {errors.link && <span className='text-danger'>Problem website is required</span>}
                    </Col>
                </Row>
                <Row className={classes.inputRow}>
                    <Col lg={3}>
                        <label htmlFor='difficulty'>Difficulty</label>
                    </Col>
                    <Col lg={9}>
                        <select id='difficulty' {...register('difficulty', {required: true})}>
                            <option>Easy</option>
                            <option>Medium</option>
                            <option>Hard</option>
                        </select>
                    </Col>
                </Row>
                <input type='submit' value='Add New Problem' />
            </Container>
        </form>

    );
};

export default NewProblemForm;