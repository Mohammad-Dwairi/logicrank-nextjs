import RoomSideNavbar from "../../../components/room-page/RoomSideNavbar";
import FilesSection from "../../../components/room-materials-page/FilesSection";
import {withProtected} from "../../../hoc/RouteAuth";


const MaterialsPage = props => {


    return (
        <div className='d-flex'>
            <div>
                <RoomSideNavbar />
            </div>
            <div className='flex-grow-1'>
                <FilesSection />
            </div>
        </div>
    );
};

export default withProtected(MaterialsPage);