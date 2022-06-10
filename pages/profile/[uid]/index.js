import {withProtected} from "../../../hoc/RouteAuth";
import {useAuth} from "../../../context/AuthContext";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import ProfilePicture from "../../../components/user-profile-page/ProfilePicture";
import UserNameSection from "../../../components/user-profile-page/UserNameSection";
import AdditionalInfoSection from "../../../components/user-profile-page/AdditionalInfoSection";
import AboutSection from "../../../components/user-profile-page/AboutSection";
import {useCallback, useLayoutEffect, useState} from "react";
import Centered from "../../../components/layout/Centered";
import LoadingSpinner from "../../../components/layout/LoadingSpinner";
import {fbQueryDocByUID} from "../../../firebase/functions/firestore-docs-functions";
import {USERS_COLLECTION} from "../../../firebase/constants/COLLECTIONS";
import {useRouter} from "next/router";

const UserProfilePage = () => {

    const {currentUser} = useAuth();
    const [userInfo, setUserInfo] = useState({});
    const [loading, setLoading] = useState(false);

    const router = useRouter();
    const {uid} = useRouter().query;

    const loadUser = useCallback(async () => {
        return await fbQueryDocByUID(USERS_COLLECTION, uid);
    }, [currentUser.uid]);

    useLayoutEffect(() => {
        setLoading(true);
        loadUser().then(userInfo => {
            if (!userInfo) {
                return router.push('/404');
            }
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