import Centered from "../components/layout/Centered";
import {Bars} from "react-loader-spinner";


const LoadingView = () => {
    return (
        <Centered>
            <Bars
                height="100"
                width="100"
                color='#4267B2'
                ariaLabel='loading'
            />
        </Centered>
    );
};

export default LoadingView;