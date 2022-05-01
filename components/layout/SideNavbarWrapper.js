import {useState} from "react";


const SideNavbarWrapper = props => {
    const [width, setWidth] = useState(80);

    return (
        <div style={{width: width, transition: 'all .3s'}} onClick={() => setWidth((prev) => prev === 270 ?  80 : 270)}>
            {props.children}
        </div>
    );
};

export default SideNavbarWrapper;