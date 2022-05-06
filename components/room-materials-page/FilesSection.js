import Container from "react-bootstrap/Container";
import FileCard from "./FileCard";
import classes from './styles.module.scss';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import FileUpload from "./FileUpload";

const FilesSection = props => {


    return (
        <Container className={classes.filesSectionContainer}>
            <h1 className={classes.headerText}>Room's Materials</h1>
            <FileUpload />
            <Row>
                <Col sm={12} md={6} lg={4} xl={3} xxl={2}>
                    <FileCard />
                </Col>
                <Col sm={12} md={6} lg={4} xl={3} xxl={2}>
                    <FileCard />
                </Col>
                <Col sm={12} md={6} lg={4} xl={3} xxl={2}>
                    <FileCard />
                </Col>
                <Col sm={12} md={6} lg={4} xl={3} xxl={2}>
                    <FileCard />
                </Col>
                <Col sm={12} md={6} lg={4} xl={3} xxl={2}>
                    <FileCard />
                </Col>
                <Col sm={12} md={6} lg={4} xl={3} xxl={2}>
                    <FileCard />
                </Col>
            </Row>
        </Container>
    );
};

export default FilesSection;