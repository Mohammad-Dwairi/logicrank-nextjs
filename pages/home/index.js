import {Fragment} from "react";
import AppNavbar from "../../components/layout/AppNavbar";
import AppSideNavbar from "../../components/layout/AppSideNavbar";
import RecentlyAccessRoomsSection from "../../components/home-page/RecentlyAccessRoomsSection";

const HomePage = () => {

    return (
        <Fragment>
            <AppNavbar/>
            <div style={{minHeight: '100vh', backgroundColor: '#cacada', display: 'flex'}}>
                <AppSideNavbar/>
                <section style={{flex: 1}}>
                    <RecentlyAccessRoomsSection rooms={DUMMY_ROOMS_CARDS}/>
                </section>
            </div>
        </Fragment>
    );
};

const DUMMY_ROOMS_CARDS = [
    {title: 'Dynamic Programming', instructor: 'Mohammad Dwairi', notification: '', img: ''},
    {title: 'Dynamic Programming', instructor: 'Mohammad Dwairi', notification: '', img: ''},
    {title: 'Dynamic Programming', instructor: 'Mohammad Dwairi', notification: '', img: ''},
];

export default HomePage;