import MessagesPage from "./[receiverId]";
import {withProtected} from "../../hoc/RouteAuth";


const DefaultMessagesPage = props => {
    return <MessagesPage/>;
};

export default withProtected(DefaultMessagesPage);