import {useLayoutEffect, useState} from "react";
import Image from "next/image";


const BlobImageView = props => {

    const {imgFile, className, maxHeight, maxWidth} = props;
    const [renderedImage, setRenderedImage] = useState(null);

    useLayoutEffect(() => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
            setRenderedImage(reader.result);
        });
        reader.readAsDataURL(imgFile);
    }, [imgFile]);

    return renderedImage && (
        <div style={{maxWidth: maxWidth || '100%', height: 'auto', maxHeight: maxHeight || 'auto'}}>
            <Image
                src={renderedImage}
                alt='img'
                className={className}
                width={10000} height={10000}/>
        </div>
    );
};

export default BlobImageView;