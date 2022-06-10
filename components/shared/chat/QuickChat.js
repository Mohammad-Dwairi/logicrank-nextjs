import {useState} from "react";
import ChatCollapsed from "./ChatCollapsed";
import ChatExpanded from "./ChatExpanded";


const QuickChat = props => {

    const [collapsed, setCollapsed] = useState(false);

    if (collapsed) {
        return <ChatCollapsed onClick={() => setCollapsed(false)}/>;
    }

    return <ChatExpanded onCollapse={() => setCollapsed(true)}/>
};

export default QuickChat;