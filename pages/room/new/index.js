import Container from "react-bootstrap/Container";
import NewRoomForm from "../../../components/new-room-page/NewRoomForm";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import {useState} from "react";
import LoadingView from "../../../hoc/LoadingView";


const NewRoomPage = () => {

    const [isLoading, setIsLoading] = useState(false);

    if (isLoading) return <LoadingView isLoading={true}/>;

    return (
        <Container className='mt-5'>
            <Row>
                <Col xl={6}>
                    <NewRoomForm
                        onSubmitStart={() => setIsLoading(true)}
                        onSubmitFinish={() => setIsLoading(false)}
                    />
                </Col>
                <Col className='d-flex justify-content-end'>
                    <Image src={require('../../../public/new-room.svg')} width={400} alt={''}/>
                </Col>
            </Row>
        </Container>
    );

};

export default NewRoomPage;