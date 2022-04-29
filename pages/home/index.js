import {Fragment} from "react";
import AppNavbar from "../../components/layout/AppNavbar";
import AppSideNavbar from "../../components/layout/AppSideNavbar";

const HomePage = () => {

    return (
        <Fragment>
            <AppNavbar/>
            <div style={{minHeight: '100vh', backgroundColor: '#cacada', display: 'flex'}}>
                <AppSideNavbar />

            </div>
        </Fragment>
    );
};

export default HomePage;