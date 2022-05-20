import {withProtected} from "../../../hoc/RouteAuth";
import {useUser} from "../../../store/UserContext";
import {useRouter} from "next/router";
import EnrolledRoom from "../../../components/room-page/EnrolledRoom";
import RoomPreview from "../../../components/room-page/RoomPreview";

const Room = () => {

    const {userInfo} = useUser();
    const router = useRouter();
    const {rid} = router.query;

    if (userInfo.enrolledRooms && userInfo.enrolledRooms.includes(rid)) {
        return <EnrolledRoom />;
    }

    return <RoomPreview userInfo={userInfo}/>;
};

export default withProtected(Room);