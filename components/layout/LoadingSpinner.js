import Spinner from "react-bootstrap/Spinner";
import Centered from "./Centered";


const LoadingSpinner = () => {

    return (
        <Spinner animation="border" role="status" style={{position: 'absolute',}}>
            <span className="visually-hidden">Loading...</span>
        </Spinner>
    );
};

export default LoadingSpinner;