import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Image from "next/image";
import UserProfileBadgePopover from "../shared/popover/UserProfileBadgePopover";
import NotificationsPopover from "../shared/popover/NotificationsPopover";
import ChatPopover from "../shared/popover/ChatPopover";
import Link from "next/link";
import {useAuth} from "../../context/AuthContext";


const AppNavbar = () => {

    const {userInfo} = useAuth();
    return (
        <div style={{height: '4.5rem'}}>
            <Navbar variant="dark" fixed='top' style={{zIndex: 10, backgroundColor: '#4267B2'}}>
                <Container>
                    <Link href='/home' passHref>
                        <Navbar.Brand style={{width: '10rem'}}>
                            <Image src={require('../../public/logo.png')} alt='logo'/>
                        </Navbar.Brand>
                    </Link>
                    <Nav className="me-auto"/>
                    <Nav className='d-flex align-items-center justify-content-center'>
                        {/*<Nav.Link>*/}
                        {/*    <NotificationsPopover/>*/}
                        {/*</Nav.Link>*/}
                        {/*<Nav.Link className='mx-2'>*/}
                        {/*    <ChatPopover/>*/}
                        {/*</Nav.Link>*/}
                        <Nav.Link>
                            <div style={{position: 'relative', top: 3}}>
                                <UserProfileBadgePopover imageLink={userInfo?.profilePicture}/>
                            </div>
                        </Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </div>

    );
};

export default AppNavbar;