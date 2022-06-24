import Row from "react-bootstrap/Row";
import classes from "./styles.module.scss";
import Col from "react-bootstrap/Col";
import Link from "next/link";
import {AiFillCode, AiFillFolder} from "react-icons/ai";
import {FcTodoList} from "react-icons/fc";
import {BiChalkboard} from "react-icons/bi";
import {useAuth} from "../../context/AuthContext";
import {GrGraphQl} from "react-icons/gr";


const ToolsSection = props => {

    const {title} = props;
    const {currentUser} = useAuth();

    return (
        <Row className={classes.raSection}>
            <h1 className={classes.raSectionTitle}>{title}</h1>
            <Col className='mt-2'>
                <Link href='/code-editor' passHref>
                    <a className={classes.toolCard}>
                        <AiFillCode className={classes.toolCardIcon}/>
                        <span>Code Editor</span>
                    </a>
                </Link>
            </Col>
            <Col className='mt-2'>
                <Link href='/whiteboard' passHref>
                    <a className={classes.toolCard}>
                        <BiChalkboard className={classes.toolCardIcon}/>
                        <span>Whiteboard</span>
                    </a>
                </Link>
            </Col>
            <Col  className='mt-2'>
                <Link href={`/profile/${currentUser.uid}/files`} passHref>
                    <a className={classes.toolCard}>
                        <AiFillFolder className={classes.toolCardIcon}/>
                        <span>My Private Files</span>
                    </a>
                </Link>
            </Col>
            <Col  className='mt-2'>
                <Link href={`/profile/${currentUser.uid}/todo`} passHref>
                    <a className={classes.toolCard}>
                        <FcTodoList className={classes.toolCardIcon}/>
                        <span>My ToDo List</span>
                    </a>
                </Link>
            </Col>
            <Col  className='mt-2'>
                <Link href={`/graph`} passHref>
                    <a className={classes.toolCard}>
                        <GrGraphQl className={classes.toolCardIcon}/>
                        <span>Graph Visualizer</span>
                    </a>
                </Link>
            </Col>
        </Row>
    );
};

export default ToolsSection;