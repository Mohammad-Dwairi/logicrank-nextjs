import Container from "react-bootstrap/Container";
import FileCard from "./FileCard";
import classes from './styles.module.scss';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MaterialsUploadInput from "./MaterialsUploadInput";


const renderFiles = files => files.map(file => <FileCard file={file} key={file.timeCreated}/>);

const FilesSection = props => {

    const {files} = props;

    return (
        <Container className={classes.filesSectionContainer}>
            <Row className='mb-2'>
                <h1 className={classes.headerText}>Room's Materials</h1>
            </Row>
            <Row>
                <Col xl={4}>
                    <MaterialsUploadInput/>
                </Col>
            </Row>
            <Row>
                <Col xl={8}>{renderFiles(files)}</Col>
            </Row>
        </Container>
    );
};

export default FilesSection;