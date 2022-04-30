import {Fragment} from "react";
import AppNavbar from "../../components/layout/AppNavbar";
import AppSideNavbar from "../../components/layout/AppSideNavbar";
import RecentlyAccessRoomsSection from "../../components/home-page/RecentlyAccessRoomsSection";
import RoomsSection from "../../components/home-page/RoomsSection";

const HomePage = () => {

    return (
        <Fragment>
            <AppNavbar/>
            <div style={{minHeight: '100vh', backgroundColor: '#cacada', display: 'flex'}}>
                <AppSideNavbar/>
                <section style={{flex: 1, display: 'block'}}>
                    <RecentlyAccessRoomsSection rooms={DUMMY_ROOMS_CARDS} title='Recently Accessed Rooms'/>
                    <RoomsSection rooms={DUMMY_ROOMS_CARDS} title='All Rooms'/>
                </section>
            </div>
        </Fragment>
    );
};

const DUMMY_ROOMS_CARDS = [
    {name: 'Dynamic Programming', instructor: 'Mohammad Dwairi', price: '180', description: 'consectetur adipisicing elit. Alias architecto aut consectetur earum eius eum eveniet illo iste magnam modi placeat porro quibusdam ratione sunt tempora unde ut, vero vitae.\n'},
    {name: 'Data structures and Algorithms', instructor: 'Abdulrahman Ajlouni', price: '155', description: 'Alias architecto aut consectetur earum eius eum eveniet illo iste magnam modi placeat porro quibusdam ratione sunt tempora unde ut, vero vitae.\n'},
    {name: 'JPC Training Level 2', instructor: 'Mohammad Dwairi', price: '180', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias architecto aut consectetur earum eius eum eveniet illo iste magnam modi placeat porro quibusdam ratione sunt tempora unde ut, vero vitae.\n'},
    {name: 'Dynamic Programming', instructor: 'Mohammad Dwairi', price: '180', description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Alias architecto aut consectetur earum eius eum eveniet illo iste magnam modi placeat porro quibusdam ratione sunt tempora unde ut, vero vitae.\n'},
];

export default HomePage;