import Container from "react-bootstrap/Container";
import FileCard from "./FileCard";
import classes from './styles.module.scss';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import MaterialsUploadInput from "./MaterialsUploadInput";
import {useEffect, useState} from "react";
import {ref, listAll, getDownloadURL, getMetadata} from "firebase/storage";
import {storage} from '../../firebase';
import {useRouter} from "next/router";
import Centered from "../layout/Centered";
import LoadingSpinner from "../layout/LoadingSpinner";


const renderFiles = files => files.map(file => <FileCard file={file} key={file.timeCreated}/>);

const FilesSection = props => {

    const [files, setFiles] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    const router = useRouter();
    const {rid} = router.query;

    useEffect(() => {
        const handle = async () => {
            const filesRef = ref(storage, `${rid}/materials`);
            const fetchedFiles = [];
            const fetchedRefs = await listAll(filesRef);
            for (const itemRef of fetchedRefs.items) {
                const meta = await getMetadata(itemRef);
                fetchedFiles.push({
                    name: meta.name,
                    type: meta.contentType,
                    timeCreated: meta.timeCreated,
                    size: meta.size,
                    link: await getDownloadURL(itemRef),
                    owner: meta.customMetadata.owner
                });
            }
            setFiles(fetchedFiles);
        };
        handle().then(() => setIsLoading(false));

    }, [rid]);

    if (isLoading) {
        return (
            <Centered>
                <LoadingSpinner/>
            </Centered>
        );
    }
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