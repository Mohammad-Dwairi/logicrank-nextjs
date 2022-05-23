import Container from "react-bootstrap/Container";
import FileCard from "./FileCard";
import classes from './styles.module.scss';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FileUploadInput from "./FileUploadInput";
import {IoAddCircleOutline} from "react-icons/io5";
import {useState} from "react";
import AppModal from "../shared/AppModal";


const renderFiles = (files, onFileDelete) => files.map(file => <FileCard file={file} key={file.timeCreated} onFileDelete={onFileDelete}/>);

const FilesSection = props => {

    const {files, onFileUpload, onFileDelete} = props;
    const [isNewFileModalOpen, setIsNewFileModalOpen] = useState(false);

    return (
        <Container className={classes.filesSectionContainer}>
            <Row>
                <Col className='d-flex justify-content-between align-items-center' xl={8}>
                    <h1 className={classes.headerText}>Room's Materials</h1>
                    <IoAddCircleOutline className={classes.openFileUploadModalIcon} onClick={() => setIsNewFileModalOpen(true)}/>
                </Col>
            </Row>
            <Row>
                <Col xl={8}>{renderFiles(files, onFileDelete)}</Col>
            </Row>
            <AppModal
                isOpen={isNewFileModalOpen}
                onRequestClose={() => setIsNewFileModalOpen(false)}
            >
                <FileUploadInput onFileUpload={onFileUpload}/>
            </AppModal>
        </Container>
    );
};

export default FilesSection;