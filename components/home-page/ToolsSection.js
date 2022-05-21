import Row from "react-bootstrap/Row";
import classes from "./styles.module.scss";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import {useAuth} from "../../store/AuthContext";


const ToolsSection = props => {

    const {title} = props;
    const {currentUser} = useAuth();

    return (
        <Row className={classes.raSection}>
            <h1 className={classes.raSectionTitle}>{title}</h1>
            <Col md={4} className='mt-2'>
                <Link href='/code-editor' passHref>
                    <a className={classes.toolCard}>
                        <span>Code Editor</span>
                    </a>
                </Link>
            </Col>
            <Col md={4} className='mt-2'>
                <Link href={`/profile/${currentUser.uid}/files`} passHref>
                    <a className={classes.toolCard}>
                        <span>My Files</span>
                    </a>
                </Link>
            </Col>
            <Col md={4} className='mt-2'>
                <Link href={`/profile/${currentUser.uid}/todo`} passHref>
                    <a className={classes.toolCard}>
                        <span>My ToDo List</span>
                    </a>
                </Link>
            </Col>
        </Row>
    );
};

export default ToolsSection;