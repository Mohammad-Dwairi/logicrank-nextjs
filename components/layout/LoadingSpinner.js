import Spinner from "react-bootstrap/Spinner";
import Centered from "./Centered";


const LoadingSpinner = () => {

    return (
        <Centered>
            <Spinner animation="border" role="status" style={{position: 'absolute',}}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </Centered>
    );
};

export default LoadingSpinner;