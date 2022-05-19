import classes from './styles.module.scss';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {useState} from "react";
import {BiUpload} from "react-icons/bi";
import {useForm} from "react-hook-form";
import {uploadBlobToStorage} from "../../store/actions/firebase-storage-actions";
import {uploadDoc} from "../../store/actions/firestore-docs-actions";
import Centered from "../layout/Centered";
import LoadingSpinner from "../layout/LoadingSpinner";
import {useAuth} from "../../store/AuthContext";
import {getUserByUID} from "../../store/actions/user-profile-actions";
import {useRouter} from "next/router";

const NewRoomForm = () => {

    const {register, handleSubmit, watch, formState: {errors}} = useForm();
    const [coverImage, setCoverImage] = useState(null);
    const [renderedImage, setRenderedImage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const {currentUser} = useAuth();
    const router = useRouter();

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
        renderImage(image);
    };

    const renderImage = (image) => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setRenderedImage(reader.result);
        });
        reader.readAsDataURL(image);
    };


    const onFormSubmit = async data => {
        setIsLoading(true);

        if (coverImage) {
            data['coverImageURL'] = await uploadBlobToStorage(coverImage);
        }

        const userInfo = await getUserByUID(currentUser.uid);

        data['roomInstructorUID'] = currentUser.uid;
        data['roomInstructor'] = userInfo.fullName;

        const roomRef = await uploadDoc('rooms', data);
        await router.replace(`/room/${roomRef.id}`);
        setIsLoading(false);

    };

    if (isLoading) {
        return (
            <Centered>
                <LoadingSpinner/>
            </Centered>
        );
    }

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
                        {errors.roomPrice && <span className='text-danger'>Room's price should be between 0$ and 200$</span>}

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
                                <img src={renderedImage} className={classes.imagePreview} alt=''/>
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