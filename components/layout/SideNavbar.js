import classes from "./styles.module.scss";
import {Menu, ProSidebar, SidebarHeader} from "react-pro-sidebar";
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";
import Image from "next/image";
import {useState} from "react";


const renderMenuItems = items => null;

const SideNavbar = props => {

    const {items} = props;
    const [collapsed, setCollapsed] = useState(true);

    return (
        <div className={classes.sideNavbarWrapper}>
            <ProSidebar collapsed={collapsed} className={classes.sideNavbar}>
                <SidebarHeader className={classes.toggle} onClick={() => setCollapsed((prev) => !prev)}>
                    {collapsed ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}
                </SidebarHeader>
                {!collapsed && <SidebarHeader>
                    <div className={classes.logoContainer}>
                        <Image src={require('../../public/pc.jpg')} alt={'logo'} className='rounded'/>
                        <h1 className={classes.roomName}>Dynamic Programming</h1>
                    </div>
                </SidebarHeader>}
                <Menu iconShape='round'>
                    {renderMenuItems(items)}
                </Menu>
            </ProSidebar>
        </div>

    );
};

export default SideNavbar;