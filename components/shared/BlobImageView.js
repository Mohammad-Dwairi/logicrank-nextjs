import {useLayoutEffect, useState} from "react";


const BlobImageView = props => {

    const {imgFile} = props;
    const [renderedImage, setRenderedImage] = useState(null);

    useLayoutEffect(() => {
        const reader = new FileReader();
        reader.addEventListener("load", () => {
           setRenderedImage(reader.result);
        });
        reader.readAsDataURL(imgFile);
    }, [imgFile]);

    return renderedImage && <img src={renderedImage} alt='img' style={{maxWidth: '100%', height: 'auto'}}/>;
};

export default BlobImageView;