import {useRouter} from 'next/router';
import RoomSideNavbar from "../../components/room-page/RoomSideNavbar";
import NewPostInput from "../../components/room-page/NewPostInput";
import NewsFeedSection from "../../components/room-page/NewsFeedSection";

const Room = props => {

    const router = useRouter();
    const {rid} = router.query;

    return (
        <section className='d-flex'>
            <RoomSideNavbar />
            <div className='flex-grow-1'>
                <NewPostInput />
                <NewsFeedSection />
            </div>
        </section>
    );
};

export default Room;