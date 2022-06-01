import {useEffect, useState} from "react";
import LoadingView from "../../hoc/LoadingView";
import Container from "react-bootstrap/Container";
import {collection, query} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {ROOM_LECTURES, ROOMS_DETAILS_COLLECTION} from "../../firebase/constants/COLLECTIONS";
import {useRouter} from "next/router";
import {fbAddNewDoc, fbQueryDocs} from "../../firebase/functions/firestore-docs-functions";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AppButton from "../shared/AppButton";
import {FaChalkboardTeacher} from "react-icons/fa";
import classes from './styles.module.scss';
import LectureCard from "./LectureCard";
import AppModal from "../shared/AppModal";
import NewLectureForm from "./NewLectureForm";

const renderLectures = lectures => lectures.map((lecture, index) => (
    <LectureCard lecture={lecture} key={index} num={index + 1}/>
));

const LecturesPage = props => {

    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const [lectures, setLectures] = useState([]);
    const {rid} = useRouter().query;

    useEffect(() => {
        const handle = async () => {
            const lecturesRef = collection(db, ROOMS_DETAILS_COLLECTION, rid, ROOM_LECTURES);
            const lecturesQuery = query(lecturesRef);
            const fetchedLectures = await fbQueryDocs(lecturesQuery);
            console.table(fetchedLectures)
            setLectures(Object.keys(fetchedLectures).map(lectureId => ({id: lectureId, ...fetchedLectures[lectureId]})));
            setIsLoading(false);
        };

        handle();
    }, [rid]);

    const onSubmitNewLecture = async data => {
        setIsLoading(true);
        data['dateCreated'] = +new Date(data.dateCreated);
        const lecturesColRef = collection(db, ROOMS_DETAILS_COLLECTION, rid, ROOM_LECTURES);
        await fbAddNewDoc(lecturesColRef, data);
        setLectures([data, ...lectures]);
        setIsModalOpen(false);
        setIsLoading(false);
    };

    return (
        <LoadingView isLoading={isLoading}>
            <Container className={classes.lecturesPage}>
                <Row className={classes.newLectureButtonContainer}>
                    <Col xl={7} className={classes.newLectureButton}>
                        <FaChalkboardTeacher className={classes.newLectureButtonIcon}/>
                        <AppButton title='Add New Lecture' outlined onClick={() => setIsModalOpen(true)}/>
                    </Col>
                </Row>
                <Row className='d-flex justify-content-center'>
                    <Col xl={7}>
                        {renderLectures(lectures)}
                    </Col>
                </Row>
            </Container>
            <AppModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                <NewLectureForm onSubmit={onSubmitNewLecture}/>
            </AppModal>
        </LoadingView>
    );
};

export default LecturesPage;