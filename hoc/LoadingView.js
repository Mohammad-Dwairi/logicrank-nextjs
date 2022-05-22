import Centered from "../components/layout/Centered";
import LoadingSpinner from "../components/layout/LoadingSpinner";


const LoadingView = ({children, isLoading}) => {

    if (isLoading) {
        return (
            <Centered>
                <LoadingSpinner/>
            </Centered>
        );
    }

    return children;
};

export default LoadingView;