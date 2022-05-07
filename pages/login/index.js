import LoginForm from "../../components/login-page/LoginForm";
import AuthPageLayout from "../../components/layout/AuthPageLayout";
import {withPublic} from "../../hoc/RouteAuth";

const LoginPage = () => {

    return (
        <AuthPageLayout headerTitle='Login' headerText='Welcome back!' login>
            <LoginForm />
        </AuthPageLayout>
    );
};

export default withPublic(LoginPage);