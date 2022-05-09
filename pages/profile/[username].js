import {withProtected} from "../../hoc/RouteAuth";
import {useAuth} from "../../contexts/AuthContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProfilePicture from "../../components/user-profile-page/ProfilePicture";
import {IoLocation} from "react-icons/io5";
import UserNameSection from "../../components/user-profile-page/UserNameSection";
import AdditionalInfoSection from "../../components/user-profile-page/AdditionalInfoSection";
import AboutSection from "../../components/user-profile-page/AboutSection";


const UserProfilePage = props => {

    const {currentUser} = useAuth();

    return (
        <Container className='mt-5 p-4 bg-light'>
            <Row className='d-flex justify-content-center'>
                <Col sm={12} lg={3}>
                    <ProfilePicture/>
                </Col>
                <Col sm={12} lg={1}/>
                <Col sm={12} lg={6}>
                    <UserNameSection/>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col sm={12} lg={3}>
                    <AdditionalInfoSection label='experience' items={['Google', 'Facebook']}/>
                    <AdditionalInfoSection label='Skills' items={['Branding', 'UI/UX', 'Web Development']}/>
                </Col>
                <Col sm={12} lg={1}/>

                <Col sm={12} lg={6}>
                    <AboutSection />
                </Col>
            </Row>
        </Container>
    );
};

export default withProtected(UserProfilePage);