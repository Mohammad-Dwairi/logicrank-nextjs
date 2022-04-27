import {BiChalkboard, BiCodeAlt, BiHomeSmile} from "react-icons/bi";
import {FiArrowUpRight} from "react-icons/fi";
import {BsFolder, BsListCheck} from "react-icons/bs";
import {MdMeetingRoom} from "react-icons/md";


export const navs = [
    {label: 'Code Editor', link: '/code-editor', icon: <BiCodeAlt size={25} className='me-2'/>},
    {label: 'Submissions', link: '/submissions', icon: <FiArrowUpRight size={25} className='me-2'/>},
    {label: 'Whiteboard', link: '/whiteboard', icon: <BiChalkboard size={25} className='me-2'/>},
    {label: 'Todo List', link: '/todo', icon: <BsListCheck size={25} className='me-2'/>},
    {label: 'Home', link: '/home', icon: <BiHomeSmile size={25} className='me-2'/>},
    {label: 'Rooms', link: '/rooms', icon: <MdMeetingRoom size={25} className='me-2'/>},
    {label: 'Files & Resources', link: '/files', icon: <BsFolder size={25} className='me-2'/>}
];