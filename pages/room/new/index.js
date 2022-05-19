import Container from "react-bootstrap/Container";
import NewRoomForm from "../../../components/new-room-page/NewRoomForm";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";


const NewRoomPage = () => {

    return (
        <Container className='mt-5'>
            <Row>
                <Col xl={6}>
                    <NewRoomForm/>
                </Col>
                <Col className='d-flex justify-content-end'>
                    <Image src={require('../../../public/new-room.svg')} width={400}/>
                </Col>
            </Row>
        </Container>
    );

};

export default NewRoomPage;