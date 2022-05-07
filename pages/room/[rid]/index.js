import {useRouter} from 'next/router';
import RoomSideNavbar from "../../../components/room-page/RoomSideNavbar";
import NewPostInput from "../../../components/room-page/NewPostInput";
import NewsFeedSection from "../../../components/room-page/NewsFeedSection";
import Container from "react-bootstrap/Container";
import {withProtected} from "../../../hoc/RouteAuth";

const Room = props => {

    const router = useRouter();
    const {rid} = router.query;

    return (
        <section className='d-flex'>
            <div>
                <RoomSideNavbar />
            </div>
            <div className='flex-grow-1'>
                <NewPostInput />
                <Container>
                    <NewsFeedSection />

                </Container>
            </div>
        </section>
    );
};

export default withProtected(Room);