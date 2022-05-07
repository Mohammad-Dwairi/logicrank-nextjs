
import RoomSideNavbar from "../../components/room-page/RoomSideNavbar";
import Container from "react-bootstrap/Container";
import CodeEditor from "../../components/code-editor-page/CodeEditor";
import OutputSection from "../../components/code-editor-page/OutputSection";
import {withProtected} from "../../hoc/RouteAuth";

const CodeEditorPage = () => {



    return (

        <section className='d-flex'>
            <div>
                <RoomSideNavbar/>
            </div>
            <div className='flex-grow-1'>
                <Container className='pt-4'>
                    <h1>Code Editor</h1>
                    <CodeEditor/>
                    <OutputSection />
                </Container>
            </div>
        </section>
    );
};

export default withProtected(CodeEditorPage);