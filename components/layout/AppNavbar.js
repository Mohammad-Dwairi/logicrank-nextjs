import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import classes from './styles.module.scss';
import Image from "next/image";

const AppNavbar = props => {

    const {brand} = props;

    return (
        <Navbar variant="dark" expand='sm' className={classes.appNavbar}>
            <Navbar.Brand href="#home" style={{width: 150, top: 4, position: 'relative', marginRight: 50}}>
                <Image src={require('../../public/logo.png')} alt='logo'/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls='main-navbar'/>
            <Navbar.Collapse id='main-navbar'>

            </Navbar.Collapse>
        </Navbar>
    );
};

export default AppNavbar;