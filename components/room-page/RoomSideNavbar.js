import {useState} from "react";
import {Menu, MenuItem, ProSidebar, SidebarHeader} from "react-pro-sidebar";
import {AiFillSetting, AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";
import Image from "next/image";
import {GiMaze} from "react-icons/gi";
import {BsCodeSquare, BsFillPeopleFill, BsNewspaper, BsStack, BsUpload} from 'react-icons/bs';
import classes from './styles.module.scss';

import 'react-pro-sidebar/dist/css/styles.css';
import {useRouter} from "next/router";
import Link from "next/link";


const RoomSideNavbar = props => {

    const {roomCoverImg} = props;

    const router = useRouter();
    const {route} = router;
    const {rid} = router.query;

    const [collapsed, setCollapsed] = useState(true);


    return (
        <div className={classes.sideNavbarWrapper}>
            <ProSidebar collapsed={collapsed} className={classes.sideNavbar}>
                <SidebarHeader className={classes.toggle} onClick={() => setCollapsed((prev) => !prev)}>
                    {collapsed ? <AiOutlineArrowRight/> : <AiOutlineArrowLeft/>}
                </SidebarHeader>
                {!collapsed && <SidebarHeader>
                    <div className={classes.logoContainer}>
                        <Image
                            src={roomCoverImg || require('../../public/dreamer.svg')}
                            alt='Room Cover Image'
                            width='100%'
                            height='100%'
                            layout='responsive'
                            objectFit='contain'
                        />
                        <h1 className={classes.roomName}>Dynamic Programming</h1>
                    </div>
                </SidebarHeader>}
                <Menu iconShape='round'>
                    <MenuItem active={route === '/room/[rid]/materials'} icon={<BsStack/>}>Materials</MenuItem>
                    <MenuItem active={route === '/room/[rid]'} icon={<BsNewspaper/>}>Updates</MenuItem>
                    <Link href={`/room/${rid}/tasks`} passHref>
                        <MenuItem active={route === '/room/[rid]/tasks'} icon={<BsNewspaper/>}>Tasks</MenuItem>
                    </Link>
                    <MenuItem active={route === '/room/[rid]/roadmap'} icon={<BsNewspaper/>}>RoadMap</MenuItem>
                    <MenuItem active={route === '/room/[rid]/code-editor'} icon={<BsCodeSquare/>}>Code Editor</MenuItem>
                    <MenuItem active={route === '/room/[rid]/problems'} icon={<GiMaze/>}>Problems</MenuItem>
                    <MenuItem active={route === '/room/[rid]/submissions'} icon={<BsUpload/>}>Submissions</MenuItem>
                    <MenuItem active={route === '/room/[rid]/members'} icon={<BsFillPeopleFill/>}>Members</MenuItem>
                    <MenuItem active={route === '/room/[rid]/settings'} icon={<AiFillSetting/>}>Settings</MenuItem>
                </Menu>
            </ProSidebar>
        </div>

    );
};

export default RoomSideNavbar;