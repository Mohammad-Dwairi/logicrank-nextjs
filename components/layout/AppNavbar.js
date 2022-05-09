import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Image from "next/image";
import {useAuth} from "../../contexts/AuthContext";
import UserProfileBadgePopover from "../shared/popover/UserProfileBadgePopover";
import NotificationsPopover from "../shared/popover/NotificationsPopover";
import ChatPopover from "../shared/popover/ChatPopover";


const AppNavbar = props => {

    const {brand} = props;
    const {logout, currentUser} = useAuth();

    if (!currentUser) {
        return null;
    }

    return (
        <div style={{height: '4.5rem'}}>
            <Navbar bg="dark" variant="dark" fixed='top' style={{zIndex: 10}}>
                <Container>
                    <Navbar.Brand href="#home" style={{width: '10rem'}}>
                        <Image src={require('../../public/logo.png')} alt='logo'/>
                    </Navbar.Brand>
                    <Nav className="me-auto"/>
                    <Nav className='d-flex align-items-center justify-content-center'>
                        <Nav.Link>
                            <NotificationsPopover />
                        </Nav.Link>
                        <Nav.Link className='mx-2'>
                            <ChatPopover />
                        </Nav.Link>
                        <Nav.Link>
                            <UserProfileBadgePopover/>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>

    );
};

export default AppNavbar;