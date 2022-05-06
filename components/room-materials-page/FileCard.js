
import classes from './styles.module.scss';
import Link from "next/link";
import {AiFillFilePdf} from "react-icons/ai";

const FileCard = props => {


    return (
        <div className={classes.fileCardContainer}>
            <div className={classes.fileIcon}>
                <AiFillFilePdf />
            </div>
            <div className={classes.fileName}>
                <Link href='#'>
                    <a>Lecture 1</a>
                </Link>
            </div>

        </div>
    );
};

export default FileCard;