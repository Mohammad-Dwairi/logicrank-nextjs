import classes from '../shared/styles.module.scss';
import {AiFillFileImage, AiFillFilePdf, AiFillFileText, AiFillFileUnknown, AiFillFileZip} from "react-icons/ai";
import Image from "next/image";
import BlobImageView from "../shared/BlobImageView";


const handleIcons = (type, iconSize) => {
    if (type.includes('pdf'))
        return <AiFillFilePdf size={iconSize}/>;
    if (type.includes('text'))
        return <AiFillFileText size={iconSize}/>;
    if (type.includes('zip') || type.includes('rar'))
        return <AiFillFileZip size={iconSize}/>;
    if (type.includes('image')) {
        return <AiFillFileImage size={iconSize}/>
    }

    return <AiFillFileUnknown size={iconSize}/>;
};

const FilePreview = props => {
    const {type, iconSize, link, file, noPreview} = props;

    if (!noPreview) {
        if (file && type.includes('image')) {
            return <BlobImageView imgFile={file}/>;
        }
        if (type.includes('image') && link) {
            return (
                <div>
                    <Image src={link} width={200} height={200} alt=''/>
                </div>
            );
        }
        if (type.includes('video')) {
            return (
                <video width="100%" height="100%" controls>
                    <source src={link} type="video/mp4"/>
                    <source src={link} type="video/ogg"/>
                    <source src={link} type="video/webm"/>
                    Your browser does not support the video tag.
                </video>
            );
        }
    }

    return <div className={classes.fileTypeIcon}>{handleIcons(type, iconSize)}</div>;
};

const FileType = props => {

    const {type, name, link, iconSize, file, noPreview, displayName} = props;

    return (
        <a href={link} download className={classes.fileTypeContainer}>
            <FilePreview iconSize={iconSize} type={type} link={link} file={file} noPreview={noPreview}/>
            {(displayName && <div className={classes.fileName}>{name}</div>)}
        </a>
    );
};

export default FileType;