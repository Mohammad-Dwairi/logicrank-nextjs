import classes from './styles.module.scss';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FileType from "./FileType";
import AppButton from "../shared/AppButton";
import {BiTrash} from "react-icons/bi";
import {useState} from "react";

const FileCard = props => {

    const {file, onFileDelete, displayOwner} = props;
    const [showControl, setShowControl] = useState(false);

    return (

        <Container className={classes.fileCardContainer}
                   onMouseEnter={() => setShowControl(true)}
                   onMouseLeave={() => setShowControl(false)}
        >
            <Row>
                <Col className={classes.fileType} md={1}>
                    <a download href={file?.link}>
                        <FileType type={file?.type}/>
                    </a>
                </Col>
                <Col md={8} className={classes.fileCardInfo}>
                    <a download href={file?.link}>
                        <div>{file?.name}</div>
                        <div>
                            <span>{(file?.size / 1024 / 1024).toFixed(2)}MB</span>
                            <span>{new Date(file?.timeCreated).toDateString()}</span>
                            {displayOwner && <span>Uploaded By {file?.owner}</span>}
                        </div>
                    </a>
                </Col>
                <Col className={classes.fileCardControl}>
                    {(window.matchMedia("(pointer: coarse)").matches || showControl) &&
                        <AppButton onClick={() => onFileDelete(file.path)}
                                   title={<BiTrash size={25}/>} outlined danger/>}
                </Col>
            </Row>
        </Container>


    );
};

export default FileCard;