import {withProtected} from "../../../../hoc/RouteAuth";
import LoadingView from "../../../../hoc/LoadingView";
import {useState} from "react";


const LectureDetailsPage = () => {

    const [isLoading, setIsLoading] = useState(true);

    return (
        <LoadingView isLoading={isLoading}>

        </LoadingView>
    );

};

export default withProtected(LectureDetailsPage);