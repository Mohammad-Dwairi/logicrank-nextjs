import Container from "react-bootstrap/Container";
import FileCard from "./FileCard";
import classes from './styles.module.scss';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FileUploadInput from "./FileUploadInput";
import {IoAddCircleOutline} from "react-icons/io5";
import {useState} from "react";
import AppModal from "../shared/AppModal";
import Image from "next/image";


const renderFiles = (files, onFileDelete) => files.map(file => <FileCard file={file} key={file.timeCreated}
                                                                         onFileDelete={onFileDelete}/>);

const FilesSection = props => {

    const {files, title, onFileUpload, onFileDelete} = props;
    const [isNewFileModalOpen, setIsNewFileModalOpen] = useState(false);


    return (
        <Container className={classes.filesSectionContainer}>
            <Row className='d-flex justify-content-center'>
                <Col className='d-flex justify-content-between align-items-center' xl={8}>
                    <h1 className={classes.headerText}>{title}</h1>
                    <div className={classes.openFileUploadModalIcon} onClick={() => setIsNewFileModalOpen(true)}>
                        <IoAddCircleOutline />
                        <span>Upload new file</span>
                    </div>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
                {files.length === 0 ?
                    <div className={classes.emptyImage}>
                        <Image alt='no files' src={require('../../public/personal-files.svg')}/>
                    </div>
                    :
                    <Col xl={8}>{renderFiles(files, onFileDelete)}</Col>}
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