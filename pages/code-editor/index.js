import {withProtected} from "../../hoc/RouteAuth";

const CodeEditorPage = () => {

    return (
        <div className='d-flex flex-grow-1'>
            <embed type="text/html" src="https://ide.judge0.com/" style={{width: '100%', height: '100vh'}}/>
        </div>
    );
};

export default withProtected(CodeEditorPage);