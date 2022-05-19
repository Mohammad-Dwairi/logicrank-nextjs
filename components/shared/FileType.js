import classes from './styles.module.scss';
import {AiFillFilePdf, AiFillFileText, AiFillFileUnknown, AiFillFileZip} from "react-icons/ai";


const handleIcons = type => {
    if (type.includes('pdf'))
        return <AiFillFilePdf />;
    if (type.includes('text'))
        return <AiFillFileText />;
    if (type.includes('zip') || type.includes('rar'))
        return <AiFillFileZip />;

    return <AiFillFileUnknown />;
};


const FileType = props => {

    const {type, name} = props;

    return (
      <div className={classes.fileTypeContainer}>
          <div className={classes.fileTypeIcon}>{handleIcons(type)}</div>
          <div className={classes.fileName}>{name}</div>
      </div>
    );
};

export default FileType;