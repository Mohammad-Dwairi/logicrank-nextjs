import {withProtected} from "../../../hoc/RouteAuth";
import {useRouter} from "next/router";
import EnrolledRoom from "../../../components/room-page/EnrolledRoom";
import RoomPreview from "../../../components/room-page/RoomPreview";
import {useSelector} from "react-redux";
import Centered from "../../../components/layout/Centered";
import LoadingSpinner from "../../../components/layout/LoadingSpinner";

const Room = () => {

    const userInfo = useSelector(state => state.userCtx.userInfo);
    const {rid} = useRouter().query;

    if (!userInfo) {
        return (
            <Centered>
                <LoadingSpinner/>
            </Centered>
        );
    }

    return userInfo.enrolledRooms && userInfo.enrolledRooms.includes(rid) ? <EnrolledRoom/> : <RoomPreview/>;

};

export default withProtected(Room);