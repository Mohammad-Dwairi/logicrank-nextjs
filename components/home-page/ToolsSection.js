import Row from "react-bootstrap/Row";
import classes from "./styles.module.scss";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import {useAuth} from "../../store/AuthContext";
import {AiFillCode, AiFillFile, AiFillFolder} from "react-icons/ai";
import {FcTodoList} from "react-icons/fc";
import {BiChalkboard} from "react-icons/bi";


const ToolsSection = props => {

    const {title} = props;
    const {currentUser} = useAuth();

    return (
        <Row className={classes.raSection}>
            <h1 className={classes.raSectionTitle}>{title}</h1>
            <Col lg={3} className='mt-2'>
                <Link href='/code-editor' passHref>
                    <a className={classes.toolCard}>
                        <AiFillCode className={classes.toolCardIcon}/>
                        <span>Code Editor</span>
                    </a>
                </Link>
            </Col>
            <Col lg={3} className='mt-2'>
                <Link href='/whiteboard' passHref>
                    <a className={classes.toolCard}>
                        <BiChalkboard className={classes.toolCardIcon}/>
                        <span>Whiteboard</span>
                    </a>
                </Link>
            </Col>
            <Col lg={3} className='mt-2'>
                <Link href={`/profile/${currentUser.uid}/files`} passHref>
                    <a className={classes.toolCard}>
                        <AiFillFolder className={classes.toolCardIcon}/>
                        <span>My Files</span>
                    </a>
                </Link>
            </Col>
            <Col lg={3} className='mt-2'>
                <Link href={`/profile/${currentUser.uid}/todo`} passHref>
                    <a className={classes.toolCard}>
                        <FcTodoList className={classes.toolCardIcon}/>
                        <span>My ToDo List</span>
                    </a>
                </Link>
            </Col>
        </Row>
    );
};

export default ToolsSection;