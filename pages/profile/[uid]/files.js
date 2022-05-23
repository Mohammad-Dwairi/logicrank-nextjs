import {useAuth} from "../../../context/AuthContext";
import FilesPage from "../../../components/files-shared/FilesPage";
import {withProtected} from "../../../hoc/RouteAuth";


const PrivateFilesPage = () => {
    const {uid} = useAuth().currentUser;
    return <FilesPage title='My Private Files' dirPath={`${uid}/files`}/>
};

export default withProtected(PrivateFilesPage);