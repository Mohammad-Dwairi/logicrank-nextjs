import classes from "../user-profile-page/styles.module.scss";
import BlobImageView from "./BlobImageView";
import Image from "next/image";

const HoverControlledImage = props => {

    const {imageBlob, link, children, maxHeight, maxWidth} = props;

    return (
        <div className={classes["story"]}>
            <figure className={classes["story__shape"]}>
                {imageBlob ? <BlobImageView imgFile={imageBlob} className={classes["story__img"]} maxHeight={maxHeight} maxWidth={maxWidth}/> :
                    <Image src={link || require('../../public/default-user.png')} alt="Person"
                           className={classes["story__img"]} width={10000} height={10000}/>}
                <figcaption className={classes["story__caption"]}>
                    {children}
                </figcaption>
            </figure>
        </div>
    );
};

export default HoverControlledImage;