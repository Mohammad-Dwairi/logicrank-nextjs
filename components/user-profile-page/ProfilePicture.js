import Image from "next/image";
import classes from './styles.module.scss';
import {BiCamera, BiCheck} from "react-icons/bi";
import FileUpload from "../files-shared/FileUpload";
import {useState} from "react";
import BlobImageView from "../shared/BlobImageView";
import AppButton from "../shared/AppButton";
import {fbUploadBlobToStorage} from "../../firebase/functions/firebase-storage-functions";
import {useAuth} from "../../context/AuthContext";
import {doc, updateDoc} from "firebase/firestore";
import {USERS_COLLECTION} from "../../firebase/constants/COLLECTIONS";
import {db} from "../../firebase/firebase";
import {RotatingSquare} from "react-loader-spinner";

const ProfilePicture = props => {

    const {link} = props;
    const {uid} = useAuth().currentUser;
    const [isLoading, setIsLoading] = useState(false);

    const [newProfilePicture, setNewProfilePicture] = useState(null);

    const pictureUploadHandler = (e) => {
        const f = e.target.files[0];
        if (f.size / 1024 / 1024 > 300) {
            e.target.value = '';
            return alert('File too large');
        }
        setNewProfilePicture(f);
        e.target.value = '';
        e.target.files = null;
    };

    const updateProfilePictureHandler = async () => {
        setIsLoading(true);
        const link = await fbUploadBlobToStorage(`${uid}`, newProfilePicture, uid);
        if (link)
            await updateDoc(doc(db, USERS_COLLECTION, uid), {profilePicture: link});
        setNewProfilePicture(null);
        setIsLoading(false);
    };

    if (isLoading)
        return (
            <div className='d-flex justify-content-center align-items-center'>
                <RotatingSquare
                    height="250"
                    width="250"
                    color='#4267B2'
                    ariaLabel='loading'
                />
            </div>
        );

    return (
        <div className={classes["story"]}>
            <figure className={classes["story__shape"]}>
                {newProfilePicture ? <BlobImageView imgFile={newProfilePicture}/> :
                    <Image src={link || require('../../public/default-user.png')} alt="Person"
                           className={classes["story__img"]} width={10000} height={10000}/>}
                <figcaption className={classes["story__caption"]}>
                    {!newProfilePicture && <FileUpload Icon={BiCamera} iconSize={50} label='Upload Picture'
                                                       onChange={pictureUploadHandler}/>}
                </figcaption>
                {
                    newProfilePicture &&
                    <AppButton
                        onClick={updateProfilePictureHandler}
                        outlined
                        title={<div style={{color: 'green', display: 'flex', alignItems: 'center'}}><BiCheck
                            size={30}/> Update Profile Picture</div>}
                    />
                }
            </figure>
        </div>
    );
};

export default ProfilePicture;