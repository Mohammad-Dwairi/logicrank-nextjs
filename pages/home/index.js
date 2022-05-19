import RecentlyAccessRoomsSection from "../../components/home-page/RecentlyAccessRoomsSection";
import RoomsSection from "../../components/home-page/RoomsSection";
import {withProtected} from "../../hoc/RouteAuth";
import Container from "react-bootstrap/Container";

const HomePage = () => {

    return (
        <div className='d-flex'>
            <Container >
                <RecentlyAccessRoomsSection title='Recently Accessed Rooms'/>
                <RoomsSection title='All Rooms'/>
            </Container>
        </div>
    );
};

export default withProtected(HomePage);