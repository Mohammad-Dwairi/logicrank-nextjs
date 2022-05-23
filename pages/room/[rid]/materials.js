
import {withProtected} from "../../../hoc/RouteAuth";
import FilesPage from "../../../components/files-shared/FilesPage";
import {useRouter} from "next/router";

const MaterialsPage = () => {

    const {rid} = useRouter().query;

    return <FilesPage title='Room Materials' dirPath={`${rid}/materials`}/>;
};

export default withProtected(MaterialsPage);