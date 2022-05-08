import LoginForm from "../../components/login-page/LoginForm";
import AuthPageLayout from "../../components/layout/AuthPageLayout";
import {withPublic} from "../../hoc/RouteAuth";
import AppFooter from "../../components/layout/AppFooter";

const LoginPage = () => {

    return (
        <>
            <AuthPageLayout headerTitle='Login' headerText='Welcome back!' login>
                <LoginForm/>
            </AuthPageLayout>
            <AppFooter/>
        </>

    );
};

export default withPublic(LoginPage);