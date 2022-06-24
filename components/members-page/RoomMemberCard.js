import classes from './styles.module.scss';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Image from "next/image";
import UserOnlineStatus from "../shared/UserOnlineStatus";
import {ImExit} from "react-icons/im";
import Link from "next/link";
import {useAuth} from "../../context/AuthContext";

const RoomMemberCard = props => {

    const {member, room} = props;
    const {uid} = useAuth().currentUser;

    const hasPermissions = room.roomInstructorUID === uid || member.id === uid;

    return (
        <Row className={classes.roomMemberCard}>
            <Col md={2} className='d-flex align-items-center'>
                <Image src={member.profilePicture || require('../../public/default-user.png')} height={50} width={50}/>
            </Col>
            <Col md={4}>
                <Link href={`/profile/${member.id}`}>
                    {member.fullName}
                </Link>
            </Col>
            <Col md={4}>
                {member.email}
            </Col>
            <Col md={1}>
                <UserOnlineStatus isOnline={member.isOnline}/>
            </Col>
            {/*{hasPermissions && <Col md={1}>*/}
            {/*    <ImExit color='crimson' size={20} style={{cursor: 'pointer'}}/>*/}
            {/*</Col>}*/}
        </Row>
    );
};

export default RoomMemberCard;