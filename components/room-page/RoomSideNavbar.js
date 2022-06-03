import {useState} from "react";
import {Menu, MenuItem, ProSidebar, SidebarFooter, SidebarHeader} from "react-pro-sidebar";
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
            <ProSidebar collapsed={collapsed} className={classes.sideNavbar} width={220}>
                <SidebarHeader className={classes.toggle} onClick={() => setCollapsed((prev) => !prev)}>
                    {collapsed ? <AiOutlineArrowRight/> : <AiOutlineArrowLeft/>}
                </SidebarHeader>

                <Menu iconShape='round'>
                    <MenuItem active={route === '/room/[rid]/materials'} icon={<BsStack/>}>Materials</MenuItem>
                    <MenuItem active={route === '/room/[rid]'} icon={<BsNewspaper/>}>Updates</MenuItem>
                    <Link href={`/room/${rid}/tasks`} passHref>
                        <MenuItem active={route === '/room/[rid]/tasks'} icon={<BsNewspaper/>}>Tasks</MenuItem>
                    </Link>
                    <Link href={`/room/${rid}/roadmap`} passHref>
                        <MenuItem active={route === '/room/[rid]/roadmap'} icon={<BsNewspaper/>}>RoadMap</MenuItem>
                    </Link>
                    <Link href={`/code-editor`} passHref>
                        <MenuItem active={route === '/code-editor'} icon={<BsCodeSquare/>}>Code Editor</MenuItem>
                    </Link>
                    <Link href={`/room/${rid}/problems`} passHref>
                        <MenuItem active={route === '/room/[rid]/problems'} icon={<GiMaze/>}>Problems</MenuItem>
                    </Link>
                    <MenuItem active={route === '/room/[rid]/submissions'} icon={<BsUpload/>}>Submissions</MenuItem>
                    <Link href={`/room/${rid}/members`} passHref>
                        <MenuItem active={route === '/room/[rid]/members'} icon={<BsFillPeopleFill/>}>Members</MenuItem>
                    </Link>
                    <MenuItem active={route === '/room/[rid]/settings'} icon={<AiFillSetting/>}>Settings</MenuItem>
                </Menu>
                {/*<SidebarFooter>*/}
                {/*    <div className={classes.logoContainer}>*/}
                {/*        <Image*/}
                {/*            src={roomCoverImg || require('../../public/dreamer.svg')}*/}
                {/*            alt='Room Cover Image'*/}
                {/*            width='100%'*/}
                {/*            height='100%'*/}
                {/*            layout='responsive'*/}
                {/*            objectFit='contain'*/}
                {/*        />*/}
                {/*        {! collapsed && <h1 className={classes.roomName}>Dynamic Programming</h1>}*/}
                {/*    </div>*/}
                {/*</SidebarFooter>*/}
            </ProSidebar>
        </div>

    );
};

export default RoomSideNavbar;