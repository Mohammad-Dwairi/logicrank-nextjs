import RoomSideNavbar from "../components/room-page/RoomSideNavbar";


export function WithRoomSideBar(props) {
    return (
        <section className='d-flex'>
            <div>
                <RoomSideNavbar/>
            </div>
            {props.children}
        </section>
    );
}
