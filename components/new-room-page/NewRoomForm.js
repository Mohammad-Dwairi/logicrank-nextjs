import classes from './styles.module.scss';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useState} from "react";
import {BiUpload} from "react-icons/bi";
import Image from "next/image";


const NewRoomForm = props => {

    const [coverImage, setCoverImage] = useState(null);

    const coverImageUploadHandler = (event) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setCoverImage(reader.result);
        });
        reader.readAsDataURL(event.target.files[0]);
    };

    return (
        <form>
            <Container className={classes.formInputContainer} fluid>
                <h1 className={classes.header}>Create New Room</h1>
                <Row className={classes.inputRow}>
                    <Col xl={3}>
                        <label htmlFor="roomName">Room Name</label>
                    </Col>
                    <Col xl={9}>
                        <input id="roomName" type='text' placeholder='Enter Room Name'/>
                    </Col>
                </Row>
                <Row className={classes.inputRow}>
                    <Col xl={3}>
                        <label htmlFor="roomLevel">Room Level</label>
                    </Col>
                    <Col xl={9}>
                        <select id="roomLevel">
                            <option>Beginner</option>
                            <option>Intermediate</option>
                            <option>Expert</option>
                        </select>
                    </Col>
                </Row>
                <Row className={classes.inputRow}>
                    <Col xl={3}>
                        <label htmlFor='roomType'>Room Type</label>
                    </Col>
                    <Col xl={9}>
                        <select id='roomType'>
                            <option>General Training</option>
                            <option>Competitive Training</option>
                            <option>Interviews Preparation</option>
                        </select>
                    </Col>
                </Row>
                <Row className={classes.inputRow}>
                    <Col xl={3}>
                        <label htmlFor='roomDescription'>Room Description</label>
                    </Col>
                    <Col xl={9}>
                        <textarea id='roomDescription' rows={4}/>
                    </Col>
                </Row>
                <Row className={classes.inputRow}>
                    <Col xl={3}>
                        <label htmlFor='fileUpload'>Upload a cover photo</label>
                    </Col>
                    <Col xl={9}>
                        {!coverImage ?
                            <label className={classes.imageUpload}>
                                <input type="file" onChange={coverImageUploadHandler}/>
                                <BiUpload/>
                            </label> :
                            <div>
                                <img src={coverImage} className={classes.imagePreview} alt=''/>
                                <a className={classes.removeImageBtn} onClick={() => setCoverImage(null)}>Remove Image</a>
                            </div>
                        }
                    </Col>
                </Row>
                <Row className={classes.inputRow}>
                    <Col xl={12}>
                        <input type="submit" value='Create Room'/>
                    </Col>
                </Row>
            </Container>
        </form>
    );
}

export default NewRoomForm;