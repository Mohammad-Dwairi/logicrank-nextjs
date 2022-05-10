import {withProtected} from "../../hoc/RouteAuth";
import {useAuth} from "../../store/AuthContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProfilePicture from "../../components/user-profile-page/ProfilePicture";
import UserNameSection from "../../components/user-profile-page/UserNameSection";
import AdditionalInfoSection from "../../components/user-profile-page/AdditionalInfoSection";
import AboutSection from "../../components/user-profile-page/AboutSection";
import {useCallback, useLayoutEffect, useState} from "react";

import {collection, getDocs, query, where} from "firebase/firestore";
import {db} from "../../firebase";
import Centered from "../../components/layout/Centered";
import LoadingSpinner from "../../components/layout/LoadingSpinner";

const UserProfilePage = () => {

    const {currentUser} = useAuth();
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(false);

    const loadUser = useCallback(async () => {
        const usersRef = collection(db, 'users');
        const q = await query(usersRef, where('__name__', '==', currentUser.uid));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs[0].data();
    }, [currentUser.uid]);

    useLayoutEffect(() => {
        setLoading(true);
        loadUser().then(userInfo => {
            setUserInfo(userInfo);
            setLoading(false);
        });
    }, [loadUser]);

    if (loading) {
        return (
            <Centered>
                <LoadingSpinner />
            </Centered>
        );
    }

    return (
        <Container className='mt-5 p-4 bg-light'>
            <Row className='d-flex justify-content-center'>
                <Col sm={12} lg={3}>
                    <ProfilePicture/>
                </Col>
                <Col sm={12} lg={1}/>
                <Col sm={12} lg={6}>
                    <UserNameSection userInfo={userInfo}/>
                </Col>
            </Row>
            <Row className='d-flex justify-content-center'>
                <Col sm={12} lg={3}>
                    <AdditionalInfoSection label='experience' items={['Google', 'Facebook']}/>
                    <AdditionalInfoSection label='Skills' items={['Branding', 'UI/UX', 'Web Development']}/>
                </Col>
                <Col sm={12} lg={1}/>

                <Col sm={12} lg={6}>
                    <AboutSection userInfo={userInfo}/>
                </Col>
            </Row>
        </Container>
    );
};

export default withProtected(UserProfilePage);