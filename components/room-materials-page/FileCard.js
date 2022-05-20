import classes from './styles.module.scss';
import Link from "next/link";
import {AiFillFilePdf} from "react-icons/ai";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FileType from "../shared/FileType";

const FileCard = props => {

    const {file} = props;

    return (
        <a download href={file?.link}>
            <Container className={classes.fileCardContainer}>
                <Row className={classes.fileType}>
                    <FileType type={file?.type} name={file?.name} center/>
                </Row>
                <Row>
                    <Col xl={4} className={classes.fileCardInfo}>
                        Uploaded By {file?.owner}
                    </Col>
                    <Col xl={4} className={classes.fileCardInfo}>
                        {new Date(file?.timeCreated).toDateString()}
                    </Col>
                    <Col xl={4} className={classes.fileCardInfo}>
                        {(file?.size / 1024 / 1024).toFixed(2)}MB
                    </Col>
                </Row>
            </Container>
        </a>

    );
};

export default FileCard;