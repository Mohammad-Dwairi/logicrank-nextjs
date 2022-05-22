import classes from './styles.module.scss';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useState} from "react";
import {BiUpload} from "react-icons/bi";
import {useForm} from "react-hook-form";
import {fbUploadBlobToStorage} from "../../firebase/functions/firebase-storage-functions";
import {fbAddNewDoc} from "../../firebase/functions/firestore-docs-functions";
import {useAuth} from "../../context/AuthContext";
import {useRouter} from "next/router";
import BlobImageView from "../shared/BlobImageView";
import {arrayUnion, collection} from "firebase/firestore";
import {ROOMS_COLLECTION} from "../../firebase/constants/COLLECTIONS";
import {useDispatch, useSelector} from "react-redux";
import {updateUserInfo} from "../../store/actions/user-actions";
import {db} from "../../firebase/firebase";

const NewRoomForm = ({onSubmitStart, onSubmitFinish}) => {

    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const [coverImage, setCoverImage] = useState(null);
    const {uid} = useAuth().currentUser;
    const router = useRouter();
    const dispatch = useDispatch();
    const userInfo = useSelector(state => state.userCtx.userInfo);

    const coverImageHandler = (event) => {
        const image = event.target.files[0];
        const acceptedTypes = ['image/JPG', 'image/jpg', 'image/JPEG', 'image/jpeg', 'image/PNG', 'image/png'];
        if (!acceptedTypes.includes(image.type)) {
            event.target.value = '';
            return alert('Invalid file type ' + image.type);
        }
        if ((image.size / 1024 / 1024).toFixed(2) > 2) {
            event.target.value = '';
            return alert('File too big');
        }
        setCoverImage(image);
    };

    const populateMetaData = async (originalData, roomUID) => {
        originalData['roomInstructorUID'] = uid;
        originalData['roomInstructor'] = userInfo.fullName;
        originalData['members'] = [uid];
        originalData['membersNum'] = 1;
        originalData['dateCreated'] = +new Date();
        if (coverImage) {
            originalData['coverImageURL'] = await fbUploadBlobToStorage(`${roomUID}/data`, coverImage);
        }
    };

    const onFormSubmit = async data => {
        onSubmitStart();
        await populateMetaData(data);
        const roomsColRef = collection(db, ROOMS_COLLECTION);
        const roomRef = await fbAddNewDoc(roomsColRef, data);
        dispatch(updateUserInfo(uid, {enrolledRooms: arrayUnion(roomRef.id)}));
        await router.replace(`/room/${roomRef.id}`);
        onSubmitFinish();
    };

    return (
        <form onSubmit={handleSubmit(onFormSubmit)}>
            <Container className={classes.formInputContainer} fluid>
                <h1 className={classes.header}>Create New Room</h1>
                <Row className={classes.inputRow}>
                    <Col xl={3}>
                        <label htmlFor="roomName">Room Name</label>
                    </Col>
                    <Col xl={9}>
                        <input
                            id="roomName"
                            type='text'
                            placeholder='Enter Room Name'
                            {...register('roomName', {required: true, minLength: 3, maxLength: 50})}
                        />
                        {errors.roomName && <span className='text-danger'>Invalid Room Name</span>}
                    </Col>
                </Row>
                <Row className={classes.inputRow}>
                    <Col xl={3}>
                        <label htmlFor="roomLevel">Room Level</label>
                    </Col>
                    <Col xl={9}>
                        <select id="roomLevel" {...register('roomLevel', {required: true})}>
                            <option value='beginner'>Beginner</option>
                            <option value='intermediate'>Intermediate</option>
                            <option value='expert'>Expert</option>
                        </select>
                    </Col>
                </Row>
                <Row className={classes.inputRow}>
                    <Col xl={3}>
                        <label htmlFor='roomType'>Room Type</label>
                    </Col>
                    <Col xl={9}>
                        <select id='roomType' {...register('roomType', {required: true})}>
                            <option value='general'>General Training</option>
                            <option value='competitive'>Competitive Training</option>
                            <option value='interviews'>Interviews Preparation</option>
                        </select>
                    </Col>
                </Row>
                <Row className={classes.inputRow}>
                    <Col xl={3}>
                        <label htmlFor='roomPrice'>Room Price</label>
                    </Col>
                    <Col xl={9}>
                        <input
                            type='number'
                            id='roomPrice'
                            placeholder='JOD 0'
                            {...register('roomPrice', {required: true, valueAsNumber: true, min: 0, max: 200})}
                        />
                        {errors.roomPrice &&
                            <span className='text-danger'>Room's price should be between 0$ and 200$</span>}

                    </Col>
                </Row>
                <Row className={classes.inputRow}>
                    <Col xl={3}>
                        <label htmlFor='roomDescription'>Room Description</label>
                    </Col>
                    <Col xl={9}>
                        <textarea id='roomDescription' rows={4} {...register('roomDescription', {required: true})}/>
                        {errors.roomName && <span className='text-danger'>Room Description is required</span>}
                    </Col>
                </Row>
                <Row className={classes.inputRow}>
                    <Col xl={3}>
                        <label htmlFor='fileUpload'>Upload a cover photo</label>
                    </Col>
                    <Col xl={9}>
                        {!coverImage ?
                            <label className={classes.imageUpload}>
                                <input type="file" onChange={coverImageHandler}/>
                                <BiUpload/>
                            </label> :
                            <div>
                                <BlobImageView imgFile={coverImage}/>
                                <a className={classes.removeImageBtn} onClick={() => setCoverImage(null)}>Remove
                                    Image</a>
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