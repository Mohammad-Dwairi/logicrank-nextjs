import Centered from "../components/layout/Centered";
import LoadingSpinner from "../components/layout/LoadingSpinner";
import {
    Audio,
    BallTriangle,
    Bars,
    Circles,
    Grid,
    Hearts,
    Oval,
    Puff,
    Rings,
    TailSpin,
    ThreeDots
} from "react-loader-spinner";


const LoadingView = ({children, isLoading}) => {

    if (isLoading) {
        return (
            <Centered>
                <Bars
                    height="100"
                    width="100"
                    color='#4267B2'
                    ariaLabel='loading'
                />
                {/*<LoadingSpinner/>*/}
            </Centered>
        );
    }

    return children;
};

export default LoadingView;