
import {withProtected} from "../../../hoc/RouteAuth";
import FilesPage from "../../../components/files-shared/FilesPage";
import {useRouter} from "next/router";
import {WithRoomSideBar, withRoomSideBar} from "../../../hoc/WithRoomSideBar";

const MaterialsPage = () => {

    const {rid} = useRouter().query;

    return (
        <WithRoomSideBar>
            <FilesPage title='Room Materials' dirPath={`${rid}/materials`}/>
        </WithRoomSideBar>
    );
};

export default withProtected(MaterialsPage);