import RoomSideNavbar from "./RoomSideNavbar";
import {Tab, Tabs} from "react-bootstrap";
import NewsFeedPage from "./NewsFeedPage";
import LecturesPage from "./LecturesPage";

import classes from './styles.module.scss';

const EnrolledRoom = ({room}) => {

    return (
        <section className='d-flex'>
            <div>
                <RoomSideNavbar roomCoverImg={room.coverImageURL}/>
            </div>
            <div className='flex-grow-1'>
                <Tabs defaultActiveKey="updates" className={classes.tabBar}>
                    <Tab eventKey="updates" title="Newsfeed & Updates" tabClassName={classes.tab}>
                        <NewsFeedPage/>
                    </Tab>
                    <Tab eventKey="lectures" title="Lectures" tabClassName={classes.tab}>
                        <LecturesPage room={room}/>
                    </Tab>
                </Tabs>
            </div>
        </section>
    );

};

export default EnrolledRoom;