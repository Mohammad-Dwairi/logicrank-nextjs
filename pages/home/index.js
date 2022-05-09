import RecentlyAccessRoomsSection from "../../components/home-page/RecentlyAccessRoomsSection";
import RoomsSection from "../../components/home-page/RoomsSection";
import {withProtected} from "../../hoc/RouteAuth";
import Container from "react-bootstrap/Container";

const HomePage = () => {

    return (
        <div className='d-flex'>
            {/*<div>*/}
            {/*    <SideNavbar items={items}/>*/}
            {/*</div>*/}
            <Container >
                <RecentlyAccessRoomsSection rooms={DUMMY_ROOMS_CARDS} title='Recently Accessed Rooms'/>
                <RoomsSection rooms={DUMMY_ROOMS_CARDS} title='All Rooms'/>
            </Container>
        </div>
    );
};

const DUMMY_ROOMS_CARDS = [
    {
        name: 'Dynamic Programming',
        instructor: 'Mohammad Dwairi',
        price: '180',
        description: 'consectetur adipisicing elit. Alias architecto aut consectetur earum eius eum eveniet illo iste magnam modi placeat porro quibusdam ratione sunt tempora unde ut, vero vitae.\n'
    },
    {
        name: 'Data structures and Algorithms',
        instructor: 'Abdulrahman Ajlouni',
        price: '155',
        description: 'Alias architecto aut consectetur earum eius eum eveniet illo iste magnam modi placeat porro quibusdam ratione sunt tempora unde ut, vero vitae.\n'
    },
    {
        name: 'JPC Training Level 2',
        instructor: 'Mohammad Dwairi',
        price: '180',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias architecto aut consectetur earum eius eum eveniet illo iste magnam modi placeat porro quibusdam ratione sunt tempora unde ut, vero vitae.\n'
    },
    {
        name: 'Dynamic Programming',
        instructor: 'Mohammad Dwairi',
        price: '180',
        description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias architecto aut consectetur earum eius eum eveniet illo iste magnam modi placeat porro quibusdam ratione sunt tempora unde ut, vero vitae.\n'
    },
];

export default withProtected(HomePage);