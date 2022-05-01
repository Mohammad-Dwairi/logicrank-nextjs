import {useState} from "react";
import {Menu, MenuItem, ProSidebar, SidebarHeader} from "react-pro-sidebar";
import {AiOutlineArrowLeft, AiOutlineArrowRight, AiFillSetting} from "react-icons/ai";
import Image from "next/image";
import {GiMaze} from "react-icons/gi";
import {BsStack, BsNewspaper, BsCodeSquare, BsUpload, BsFillPeopleFill} from 'react-icons/bs';
import classes from './styles.module.scss';

import 'react-pro-sidebar/dist/css/styles.css';
import SideNavbarWrapper from "../layout/SideNavbarWrapper";

const RoomSideNavbar = props => {

    const [collapsed, setCollapsed] = useState(true);

    return (
        <SideNavbarWrapper>
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
                    <MenuItem icon={<BsStack />} >Materials</MenuItem>
                    <MenuItem icon={<BsNewspaper />}>Updates</MenuItem>
                    <MenuItem icon={<BsNewspaper />}>Tasks</MenuItem>
                    <MenuItem icon={<BsNewspaper />}>RoadMap</MenuItem>
                    <MenuItem icon={<BsCodeSquare />}>Code Editor</MenuItem>
                    <MenuItem icon={<GiMaze />}>Problems</MenuItem>
                    <MenuItem icon={<BsUpload />}>Submissions</MenuItem>
                    <MenuItem icon={<BsFillPeopleFill />}>Members</MenuItem>
                    <MenuItem icon={<AiFillSetting />}>Settings</MenuItem>
                </Menu>
            </ProSidebar>
        </SideNavbarWrapper>

    );
};

export default RoomSideNavbar;