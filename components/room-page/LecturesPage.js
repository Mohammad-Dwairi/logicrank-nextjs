import {useCallback, useEffect, useState} from "react";
import Container from "react-bootstrap/Container";
import {addDoc, collection, orderBy, query} from "firebase/firestore";
import {db} from "../../firebase/firebase";
import {ROOM_LECTURES, ROOMS_DETAILS_COLLECTION} from "../../firebase/constants/COLLECTIONS";
import {useRouter} from "next/router";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import AppButton from "../shared/AppButton";
import {FaChalkboardTeacher} from "react-icons/fa";
import classes from './styles.module.scss';
import LectureCard from "./LectureCard";
import AppModal from "../shared/AppModal";
import NewLectureForm from "./NewLectureForm";
import LoadingView from "../../hoc/LoadingView";
import {fbQueryDocs} from "../../firebase/functions/firestore-docs-functions";
import Image from "next/image";
import {useAuth} from "../../context/AuthContext";

const renderLectures = lectures => Object.keys(lectures).map((lectureId, index) => (
    <LectureCard id={lectureId} lecture={lectures[lectureId]} key={lectureId} num={index + 1}/>
));

const LecturesPage = ({room}) => {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const {rid} = useRouter().query;
    const {uid} = useAuth().currentUser;

    const [lectures, setLectures] = useState({});

    const isOwner = uid === room.roomInstructorUID;

    const fetchLectures = useCallback(async () => {
        const lecturesRef = collection(db, ROOMS_DETAILS_COLLECTION, rid, ROOM_LECTURES);
        const q = query(lecturesRef, orderBy("dateCreated", "desc"));
        const fetchedLectures = await fbQueryDocs(q);
        if (fetchedLectures)
            setLectures(fetchedLectures);
    }, [rid]);

    const onSubmitNewLecture = async data => {
        setIsLoading(true);
        data['dateCreated'] = +new Date(data.dateCreated);
        const roomDetailsRef = collection(db, ROOMS_DETAILS_COLLECTION, rid, ROOM_LECTURES);
        await addDoc(roomDetailsRef, data);
        setIsModalOpen(false);
        fetchLectures().then(() => setIsLoading(false));
    };

    useEffect(() => {
        fetchLectures().then(() => setIsLoading(false));
    }, [fetchLectures])

    if (isLoading) return <LoadingView/>

    return (
        <>
            <Container className={classes.lecturesPage}>
                {isOwner && <Row className={classes.newLectureButtonContainer}>
                    <Col xl={7} className={classes.newLectureButton}>
                        <FaChalkboardTeacher className={classes.newLectureButtonIcon}/>
                        <AppButton title='Schedule New Lecture' outlined onClick={() => setIsModalOpen(true)}/>
                    </Col>
                </Row>}
                <Row className='d-flex justify-content-center '>
                    <Col xl={7} className='d-flex justify-content-center flex-column mt-5'>
                        {
                            lectures && Object.keys(lectures).length !== 0 ? renderLectures(lectures) :
                                <div className='mt-5 d-flex flex-column justify-content-center'>
                                    <Image src={require('../../public/no-data.svg')} width={350} height={350}/>
                                    <p className='text-center mt-3 fw-bold'>No Lectures yet</p>
                                </div>
                        }
                    </Col>
                </Row>
            </Container>
            <AppModal isOpen={isModalOpen} onRequestClose={() => setIsModalOpen(false)}>
                <NewLectureForm onSubmit={onSubmitNewLecture}/>
            </AppModal>
        </>
    );
};

export default LecturesPage;