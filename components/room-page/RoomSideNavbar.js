import {useState} from "react";
import {Menu, MenuItem, ProSidebar, SidebarHeader} from "react-pro-sidebar";
import {AiOutlineArrowLeft, AiOutlineArrowRight} from "react-icons/ai";
import {GiMaze} from "react-icons/gi";
import {BsCodeSquare, BsFillPeopleFill, BsNewspaper, BsStack, BsUpload} from 'react-icons/bs';
import classes from './styles.module.scss';

import 'react-pro-sidebar/dist/css/styles.css';
import {useRouter} from "next/router";
import Link from "next/link";
import {BiChat} from "react-icons/bi";


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

                <Menu iconShape='round' className='mt-3'>
                    <Link href={`/room/${rid}/chat`} passHref>
                        <MenuItem active={route === '/room/[rid]'} className='mb-3' icon={<BiChat/>}>Messages</MenuItem>
                    </Link>
                    <Link href={`/room/${rid}`} passHref>
                        <MenuItem active={route === '/room/[rid]'} className='mb-3' icon={<BsNewspaper/>}>Updates</MenuItem>
                    </Link>
                    <Link href={`/room/${rid}/materials`} passHref>
                        <MenuItem active={route === '/room/[rid]/materials'} className='mb-3' icon={<BsStack/>}>Materials</MenuItem>
                    </Link>
                    <Link href={`/room/${rid}/roadmap`} passHref>
                        <MenuItem active={route === '/room/[rid]/roadmap'} className='mb-3' icon={<BsNewspaper/>}>RoadMap</MenuItem>
                    </Link>
                    <Link href={`/code-editor`} passHref>
                        <MenuItem active={route === '/code-editor'} className='mb-3' icon={<BsCodeSquare/>}>Code Editor</MenuItem>
                    </Link>
                    <Link href={`/room/${rid}/problems`} passHref>
                        <MenuItem active={route === '/room/[rid]/problems'} className='mb-3' icon={<GiMaze/>}>Problems Set</MenuItem>
                    </Link>
                    <Link href={`/room/${rid}/submissions`} passHref>
                        <MenuItem active={route === '/room/[rid]/submissions'} className='mb-3' icon={<BsUpload/>}>Submissions</MenuItem>
                    </Link>
                    <Link href={`/room/${rid}/members`} passHref>
                        <MenuItem active={route === '/room/[rid]/members'} className='mb-3' icon={<BsFillPeopleFill/>}>Members</MenuItem>
                    </Link>
                    {/*<MenuItem active={route === '/room/[rid]/settings'} icon={<AiFillSetting/>}>Settings</MenuItem>*/}
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