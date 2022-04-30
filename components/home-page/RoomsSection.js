import Container from "react-bootstrap/Container";
import classes from './styles.module.scss';
import RoomCard from "./RoomCard";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const renderRooms = rooms => {

   return rooms?.map((room, index) => (
       <Col xxl={3} xl={4} lg={6} sm={12} key={index} className={'d-flex justify-content-center align-items-center'}>
           <RoomCard room={room}/>
       </Col>
   ));
};


const RoomsSection = props => {

    const {title, rooms} = props;

    return (
        <Container fluid className={classes.raSection}>
            <h1 className={classes.raSectionTitle}>{title}</h1>
            <Row>
                {renderRooms(rooms)}
            </Row>
        </Container>
    );
};

export default RoomsSection;