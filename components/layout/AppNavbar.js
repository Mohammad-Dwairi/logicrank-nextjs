import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import classes from './styles.module.scss';
import Image from "next/image";
import {useAuth} from "../../contexts/AuthContext";

const AppNavbar = props => {

    const {brand} = props;
    const {logout} = useAuth();

    return (
        <Navbar variant="dark" expand='sm' className={classes.appNavbar}>
            <Navbar.Brand href="#home" style={{width: 150, top: 4, position: 'relative', marginRight: 50}}>
                <Image src={require('../../public/logo.png')} alt='logo'/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='main-navbar'/>
            <Navbar.Collapse id='main-navbar'>
                <Nav.Item onClick={logout}>Logout</Nav.Item>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default AppNavbar;