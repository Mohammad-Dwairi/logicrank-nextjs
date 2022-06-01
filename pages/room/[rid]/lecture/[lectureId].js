import {withProtected} from "../../../../hoc/RouteAuth";
import LoadingView from "../../../../hoc/LoadingView";
import {useEffect, useState} from "react";
import {fbQuerySingleDoc} from "../../../../firebase/functions/firestore-docs-functions";
import {ROOM_LECTURES, ROOMS_DETAILS_COLLECTION} from "../../../../firebase/constants/COLLECTIONS";
import {useRouter} from "next/router";
import Container from "react-bootstrap/Container";
import LectureInfo from "../../../../components/lecture-details-page/LectureInfo";
import {collection, query} from "firebase/firestore";
import {db} from "../../../../firebase/firebase";
import LectureDiscussion from "../../../../components/lecture-details-page/LectureDiscussion";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";


const LectureDetailsPage = () => {

    const [isLoading, setIsLoading] = useState(true);
    const {lectureId, rid} = useRouter().query;
    const [lecture, setLecture] = useState(null);

    useEffect(() => {
        const handle = async () => {
            const q = query(collection(db, ROOMS_DETAILS_COLLECTION, rid, ROOM_LECTURES));
            const lecture = await fbQuerySingleDoc(q);
            setLecture(lecture);
            setIsLoading(false);
        };
        handle();
    }, [lectureId]);

    const onCommentUpdate = (comments) => {
        const updatedLecture = {...lecture};
        updatedLecture.comments = comments;
        setLecture(updatedLecture);
    };

    return (
        <LoadingView isLoading={isLoading}>
            <Container className='mt-5'>
                <Row>
                    <Col xl={4}>
                        <LectureInfo lecture={lecture}/>
                    </Col>
                    <Col xl={8}>
                        <LectureDiscussion comments={lecture?.comments} updateCommentsHandler={onCommentUpdate}/>
                    </Col>
                </Row>
            </Container>
        </LoadingView>
    );

};

export default withProtected(LectureDetailsPage);